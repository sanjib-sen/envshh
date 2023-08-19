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
    return result.toString("utf-8").trim();
  } catch (error) {
    if (!ignoreIfFails) {
      return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let theError: string = (error as any).stderr
      .toString()
      .trim()
      .split("\n")
      .join(" ");
    if (!command.includes("\n"))
      theError = theError.replaceAll("/bin/sh: line 1: ", "");
    log.error("Got error while running command: " + command);
    log.commandError(theError);
    process.exit(1);
  }
}
