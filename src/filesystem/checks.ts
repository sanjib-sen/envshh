// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as fs from "fs";
import { log } from "../utils/log.js";

export function isPathExists(directoryOrFilePath: string) {
  return fs.existsSync(directoryOrFilePath) ? true : false;
}

export function isDirectoryEmpty(directoryPath: string) {
  return fs.readdirSync(directoryPath).length === 0;
}

export function isPathADirectory(directoryOrFilePath: string) {
  if (isPathExists(directoryOrFilePath) === false) {
    log.error(`Path ${directoryOrFilePath} does not exist.`);
  }
  return fs.lstatSync(directoryOrFilePath).isDirectory();
}
