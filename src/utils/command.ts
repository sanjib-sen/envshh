// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { execSync } from "child_process";

export function runCommand(command: string) {
  execSync(command, {
    stdio: "inherit",
  });
}
