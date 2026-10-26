import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status) process.exit(result.status);
}

if (!existsSync("equitas-app/node_modules/vite")) {
  run("npm", ["ci", "--prefix", "equitas-app"]);
}

run("npm", ["run", "build", "--prefix", "equitas-app"]);
run("npx", ["next", "build", "--webpack"]);
