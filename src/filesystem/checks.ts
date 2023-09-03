// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as fs from "fs";
import { exitWithError } from "../utils/process.js";
import { log } from "../utils/log.js";

export function isPathExists(directoryOrFilePath: string) {
  log.flow(`Checking if Path ${directoryOrFilePath} exists`);
  return fs.existsSync(directoryOrFilePath) ? true : false;
}

export function isDirectoryEmpty(directoryPath: string) {
  log.flow(`Checking if Directory ${directoryPath} is empty`);
  if (isPathExists(directoryPath) === false)
    return exitWithError(
      "Got Invalid for while checking if directory is Empty. Directory does not exist.",
    );
  return fs.readdirSync(directoryPath).length === 0;
}

export function isPathADirectory(directoryOrFilePath: string) {
  log.flow(`Checking if Path ${directoryOrFilePath} is a directory`);
  if (isPathExists(directoryOrFilePath) === false)
    return exitWithError(
      "Got invalid path while checking if the path is a directory. Path does not exist.",
    );
  return fs.lstatSync(directoryOrFilePath).isDirectory();
}
