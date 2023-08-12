// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { execSync } from "child_process";
import { log } from "./log.js";

export function runCommand(command: string, ignoreIfFails = false) {
  let result;
  try {
    result = execSync(command, {
      stdio: "pipe",
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      log.error("Got error while running command: " + command);
      log.command("Command Output: " + (result ? result.toString() : ""));
      if (ignoreIfFails) {
        return result || false;
      } else {
        process.exit(1);
      }
    }
  }
}
