import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status) process.exit(result.status);
}

if (!existsSync("equitas-app/node_modules/vite")) {
  // Vercel sets NODE_ENV=production; nested ci would omit devDependencies (vite, tsc).
  run("npm", ["ci", "--prefix", "equitas-app", "--include=dev"]);
}

run("npm", ["run", "build", "--prefix", "equitas-app"]);
run("npx", ["next", "build", "--webpack"]);
