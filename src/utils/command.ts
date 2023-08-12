// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { execSync } from "child_process";
import { log } from "./log.js";

export function runCommand(command: string, ignoreIfFails: false) {
  let result;
  try {
    result = execSync(command, {
      stdio: "inherit",
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      log.error("Got error while running command: " + command);
      log.error("Command Output: " + (result ? result.toString() : ""));
      log.error(error.message);
      if (ignoreIfFails) {
        return result;
      } else {
        process.exit(1);
      }
    }
  }
}
