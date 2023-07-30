// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { name } from "../package.json";
process.stdout.write(`Hello from ${name}!\n`);
import { execSync } from "child_process";

try {
  const gitVersion = execSync("git --version");
  process.stdout.write(`${gitVersion}`);
} catch (error) {
  process.exit(1);
}
