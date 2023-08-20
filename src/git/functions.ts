// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { execSync } from "child_process";
import { isDirectoryEmpty, isPathExists } from "../filesystem/checks.js";
import { log } from "../utils/log.js";
import {
  isDirectoryAGitRepository,
  isRepositoryExistsOnRemote,
} from "./checks.js";
import { EnvshhInstanceType } from "../types/schemas.js";
import { runCommand } from "../utils/command.js";
import { exitWithError, exitWithSuccess } from "../utils/process.js";
import { handleError } from "../utils/error.js";

export function cloneRepo(envshh: EnvshhInstanceType): void {
  if (!envshh.mainRepoUrl) {
    return exitWithError("Repository URL is not defined.");
  }
  if (isRepositoryExistsOnRemote(envshh.mainRepoUrl) === false) {
    return exitWithError("Repository does not exist on Remote.");
  }
  if (
    isPathExists(envshh.mainDirectory) === true &&
    isDirectoryEmpty(envshh.mainDirectory) === false
  ) {
    return exitWithError(
      `Directory ${envshh.mainDirectory} already exists. But it is not empty. It is not safe to clone here.`
    );
  }
  runCommand(`git clone ${envshh.mainRepoUrl} ${envshh.mainDirectory}`);
}

export function pullRepo(envshh: EnvshhInstanceType): void {
  try {
    execSync(`git -C ${envshh.mainDirectory} pull`);
  } catch (error) {
    if (error instanceof Error) {
      log.warn(error.toString());
    }
    if (
      error instanceof Error &&
      error
        .toString()
        .trim()
        .includes(
          "Your configuration specifies to merge with the ref 'refs/heads/main'"
        )
    ) {
      runCommand(
        `cd '${
          envshh.mainDirectory
        }' && echo "# Envshh Instance: ${envshh.name.toUpperCase()}" >> README.md && git add . && git commit -m "first commit" && git branch -M main && git push -u origin main`
      );
      return exitWithSuccess("Successfully pushed to remote repository");
    }
    return handleError(error);
  }
}

export function commitRepo(envshh: EnvshhInstanceType) {
  runCommand(`git -C ${envshh.mainDirectory} add .`);
  runCommand(
    `git -C ${envshh.mainDirectory} commit -m "${new Date().toUTCString()}"`
  );
}

export function pushRepo(envshh: EnvshhInstanceType) {
  runCommand(`git -C ${envshh.mainDirectory} push origin main`);
}

function getProjectNameFromRepoUrl(url: string) {
  return url.split("/").pop()?.replace(".git", "").trim();
}

export function getGitRepoName(location: string) {
  if (isDirectoryAGitRepository(location)) {
    const origin = runCommand("git config --get remote.origin.url");
    return origin ? getProjectNameFromRepoUrl(origin) : undefined;
  }
  return undefined;
}
