// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as fs from "fs";
import { log } from "../utils/log.js";
import path from "path";

export function createDirectory(directoryPath: string, recursive = false) {
  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: recursive });
    }
  } catch (error) {
    log.error(`Failed to create directory ${directoryPath}.`);
    process.exit(1);
  }
}

export function deleteDirectoryOrFile(
  directoryOrFilePath: string,
  recursive = false
) {
  try {
    if (fs.existsSync(directoryOrFilePath)) {
      fs.rmSync(directoryOrFilePath, { recursive: recursive });
    }
  } catch (error) {
    log.error(`Failed to Delete directory or file ${directoryOrFilePath}.`);
    process.exit(1);
  }
}

export function getParentDirectory(filePath: string) {
  return path.resolve(filePath, "..");
}

export function createFile(filePath: string, data: string) {
  const directoryPath = getParentDirectory(filePath);
  createDirectory(directoryPath, true);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, data);
    }
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    log.error(`Failed to create file ${filePath}. ${errorMessage}`);
    process.exit(1);
  }
}

export function copyFileAndFolder(sourcePath: string, destinationPath: string) {
  try {
    fs.cpSync(sourcePath, destinationPath, { recursive: true });
  } catch (error) {
    log.error(`Failed to copy file ${sourcePath} to ${destinationPath}.`);
    process.exit(1);
  }
}
