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
import { EnvshhInstance } from "../envshh/envshh.js";
import path from "path";

export function cloneRepo(envshh: EnvshhInstanceType): void {
  if (!envshh.remoteRepoUrl) {
    return exitWithError("Repository URL is not defined.");
  }
  if (isRepositoryExistsOnRemote(envshh.remoteRepoUrl) === false) {
    return exitWithError("Repository does not exist on Remote.");
  }
  if (
    isPathExists(envshh.localDirectory) === true &&
    isDirectoryEmpty(envshh.localDirectory) === false
  ) {
    return exitWithError(
      `Directory ${envshh.localDirectory} already exists. But it is not empty. It is not safe to clone here.`,
    );
  }
  runCommand(`git clone ${envshh.remoteRepoUrl} ${envshh.localDirectory}`);
}

export function pullRepo(envshh: EnvshhInstanceType): void {
  try {
    execSync(`git -C ${envshh.localDirectory} pull origin main`, {
      stdio: ["ignore", "ignore", "pipe"],
    });
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
          "Your configuration specifies to merge with the ref 'refs/heads/main'",
        )
    ) {
      initRepo(envshh);
      return exitWithSuccess("Successfully pushed to remote repository");
    }
    return handleError(error);
  }
}

export function addRemoteRepo(envshh: EnvshhInstanceType) {
  runCommand(
    `git -C ${envshh.localDirectory} remote add origin ${envshh.remoteRepoUrl}`,
  );
}

export function initRepo(envshh: EnvshhInstanceType) {
  runCommand(`git -C ${envshh.localDirectory} init`);
  envshh.remoteRepoUrl ?? addRemoteRepo(envshh);
  runCommand(`git -C ${envshh.localDirectory} branch -M main`);
  runCommand(
    `echo "# Envshh Instance: ${envshh.name.toUpperCase()}" >> ${path.join(
      envshh.localDirectory,
      "README.md",
    )}`,
  );
  new EnvshhInstance(envshh).gitCommit();
  envshh.remoteRepoUrl
    ? runCommand(`git -C ${envshh.localDirectory} push -u origin main`)
    : "";
}

export function commitRepo(envshh: EnvshhInstanceType) {
  runCommand(`git -C ${envshh.localDirectory} add .`);
  runCommand(
    `git -C ${envshh.localDirectory} commit -m "${new Date().toUTCString()}"`,
    true,
  );
}

export function pushRepo(envshh: EnvshhInstanceType) {
  runCommand(`git -C ${envshh.localDirectory} push origin main`);
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
