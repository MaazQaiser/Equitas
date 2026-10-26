import { spawn } from "node:child_process";
import net from "node:net";

function portOpen(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host: "127.0.0.1" }, () => {
      socket.end();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
  });
}

function waitForPort(port, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      if (await portOpen(port)) return resolve();
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timed out waiting for the product app on port ${port}`));
        return;
      }
      setTimeout(tick, 200);
    };
    tick();
  });
}

const children = [];

function stop() {
  for (const child of children) child.kill("SIGTERM");
}

process.on("SIGINT", () => {
  stop();
  process.exit(0);
});
process.on("SIGTERM", () => {
  stop();
  process.exit(0);
});

const viteAlreadyUp = await portOpen(5173);
if (!viteAlreadyUp) {
  const vite = spawn("npm", ["run", "dev", "--prefix", "equitas-app"], { stdio: "inherit" });
  children.push(vite);
  vite.on("exit", (code) => {
    if (code) {
      stop();
      process.exit(code);
    }
  });
  await waitForPort(5173);
}

const port = process.env.PORT || "3003";
const next = spawn("npx", ["next", "dev", "-p", port], { stdio: "inherit" });
children.push(next);
next.on("exit", (code) => {
  stop();
  process.exit(code ?? 0);
});
