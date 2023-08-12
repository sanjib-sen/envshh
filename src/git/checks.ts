// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { isPathExists } from "../filesystem/checks.js";
import { runCommand } from "../utils/command.js";

export function isGitInstalledAndPathed() {
  try {
    runCommand("git --version", true);
    return true;
  } catch (error) {
    return false;
  }
}

export function isRepositoryExistsOnRemote(repositoryAddress: string) {
  try {
    runCommand(`git ls-remote ${repositoryAddress}`, true);
    return true;
  } catch (error) {
    return false;
  }
}

export function isDirectoryAGitRepository(directoryPath: string) {
  if (isPathExists(directoryPath) === false) return false;
  try {
    runCommand(`git -C ${directoryPath} rev-parse --is-inside-work-tree`);
    return true;
  } catch (error) {
    return false;
  }
}
