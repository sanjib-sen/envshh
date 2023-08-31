// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as fs from "fs";
import path from "path";
import { handleError } from "../utils/error.js";
import { isPathExists } from "./checks.js";
import { exitWithError } from "../utils/process.js";

export function createDirectory(directoryPath: string, recursive = true): void {
  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: recursive });
    }
  } catch (error) {
    return handleError(error, `Failed to create directory ${directoryPath}.`);
  }
}

export function readFile(destination: string) {
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
): void {
  try {
    if (fs.existsSync(directoryOrFilePath)) {
      fs.rmSync(directoryOrFilePath, { recursive: recursive, force: true });
    }
  } catch (error) {
    return handleError(error, `Failed to delete ${directoryOrFilePath}.`);
  }
}

export function getParentDirectory(filePath: string) {
  const parentDirectory = path.resolve(filePath, "..");
  if (isPathExists(parentDirectory)) return parentDirectory;
  else {
    createDirectory(parentDirectory, true);
    return parentDirectory;
  }
}

export function createFile(filePath: string, data: string): void {
  const directoryPath = getParentDirectory(filePath);
  createDirectory(directoryPath, true);
  try {
    fs.writeFileSync(filePath, data);
  } catch (error) {
    return handleError(`Failed to create file ${filePath}.`);
  }
}

export function copyFileAndFolder(
  sourcePath: string,
  destinationPath: string,
): void {
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
  const seperator = process.platform === "win32" ? "\\" : "/";
  return process.cwd().split(seperator).pop() as string;
}
