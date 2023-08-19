// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { isPathExists } from "../filesystem/checks.js";
import { runCommand } from "../utils/command.js";

export function isGitInstalledAndPathed() {
  return runCommand("git --version", true);
}

export function isRepositoryExistsOnRemote(repositoryAddress: string) {
  return runCommand(`git ls-remote ${repositoryAddress}`, true);
}

export function isDirectoryAGitRepository(directoryPath: string) {
  if (isPathExists(directoryPath) === false) return false;
  return runCommand(
    `git -C ${directoryPath} rev-parse --is-inside-work-tree`,
    true
  );
}
