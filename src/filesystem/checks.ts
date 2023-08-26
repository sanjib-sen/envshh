// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as fs from "fs";
import { exitWithError } from "../utils/process.js";

export function isPathExists(directoryOrFilePath: string) {
  return fs.existsSync(directoryOrFilePath) ? true : false;
}

export function isDirectoryEmpty(directoryPath: string) {
  if (isPathExists(directoryPath) === false)
    return exitWithError("Invalid path.");
  return fs.readdirSync(directoryPath).length === 0;
}

export function isPathADirectory(directoryOrFilePath: string) {
  if (isPathExists(directoryOrFilePath) === false)
    return exitWithError("Invalid path.");
  return fs.lstatSync(directoryOrFilePath).isDirectory();
}
