// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { execSync } from "child_process";
import { isPathExists } from "../filesystem/checks.js";

export function isGitInstalledAndPathed() {
  try {
    execSync("git --version");
    return true;
  } catch (error) {
    return false;
  }
}

export function isRepositoryExistsOnRemote(repositoryAddress: string) {
  try {
    execSync(`git ls-remote ${repositoryAddress}`);
    return true;
  } catch (error) {
    return false;
  }
}

export function isDirectoryAGitRepository(directoryPath: string) {
  if (isPathExists(directoryPath) === false) return false;
  try {
    execSync(`git -C ${directoryPath} rev-parse --is-inside-work-tree`, {
      stdio: "ignore",
    });
    return true;
  } catch (error) {
    return false;
  }
}
