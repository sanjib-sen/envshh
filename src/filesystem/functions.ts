// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as fs from "fs";
import path from "path";
import { handleError } from "../utils/error.js";
import { isPathExists } from "./checks.js";
import { exitWithError } from "../utils/process.js";
import { log } from "../utils/log.js";

export function createDirectory(directoryPath: string, recursive = true) {
  log.flow(`Creating directory ${directoryPath}`);
  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: recursive });
    }
  } catch (error) {
    return handleError(error, `Failed to create directory ${directoryPath}.`);
  }
}

export function readFile(destination: string) {
  log.flow(`Reading file ${destination}`);
  try {
    return fs.readFileSync(destination, "utf-8");
  } catch (error) {
    return handleError(error, `Failed to read file ${destination}.`);
  }
}

export function renameFileOrDirectory(
  sourcePath: string,
  destinationPath: string,
) {
  log.flow(`Renaming ${sourcePath} to ${destinationPath}`);
  try {
    fs.renameSync(sourcePath, destinationPath);
  } catch (error) {
    return handleError(
      error,
      `Failed to rename ${sourcePath} to ${destinationPath}.`,
    );
  }
}

export function deleteDirectoryOrFile(
  directoryOrFilePath: string,
  recursive = true,
) {
  log.flow(`Deleting ${directoryOrFilePath}`);
  try {
    if (fs.existsSync(directoryOrFilePath)) {
      fs.rmSync(directoryOrFilePath, { recursive: recursive, force: true });
    }
  } catch (error) {
    return handleError(error, `Failed to delete ${directoryOrFilePath}.`);
  }
}

export function getParentDirectory(filePath: string) {
  log.flow(`Getting parent directory of ${filePath}`);
  const parentDirectory = path.resolve(filePath, "..");
  if (isPathExists(parentDirectory)) return parentDirectory;
  else {
    createDirectory(parentDirectory, true);
    return parentDirectory;
  }
}

export function createFile(filePath: string, data: string) {
  log.flow(`Creating file ${filePath}`);
  const directoryPath = getParentDirectory(filePath);
  createDirectory(directoryPath, true);
  try {
    fs.writeFileSync(filePath, data);
  } catch (error) {
    return handleError(`Failed to create file ${filePath}.`);
  }
}

export function copyFileAndFolder(sourcePath: string, destinationPath: string) {
  log.flow(`Copying ${sourcePath} to ${destinationPath}`);
  if (isPathExists(sourcePath) === false)
    return exitWithError(`Source path ${sourcePath} does not exist.`);
  if (isPathExists(destinationPath) === false)
    return exitWithError(`Destination path ${destinationPath} does not exist.`);
  try {
    fs.cpSync(sourcePath, destinationPath, { recursive: true });
  } catch (error) {
    return handleError(
      `Failed to copy file ${sourcePath} to ${destinationPath}.`,
    );
  }
}

export function getCurrentWorkingDirectoryName() {
  log.flow(`Getting current working directory name`);
  const seperator = process.platform === "win32" ? "\\" : "/";
  const directoryName = process.cwd().split(seperator).pop() as string;
  log.flow(`Current working directory name: ${directoryName}`);
  return directoryName;
}
