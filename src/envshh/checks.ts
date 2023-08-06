// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.

import { execSync } from "child_process";
import * as inspector from "inspector";
import * as fs from "fs";

// https://opensource.org/licenses/MIT
export function isGitInstalledAndPathed() {
  try {
    execSync("git --version");
    return true;
  } catch (error) {
    return false;
  }
}

export function isInDebugMode() {
  return inspector.url() !== undefined;
}

export function isDirectoryExists(directoryPath: string) {
  return fs.existsSync(directoryPath) ? true : false;
}

export function isFileExists(filePath: string) {
  return fs.existsSync(filePath) ? true : false;
}

export function isRepositoryExistsOnUpstream(repositoryAddress: string) {
  try {
    execSync(`git ls-remote ${repositoryAddress}`);
    return true;
  } catch (error) {
    return false;
  }
}
