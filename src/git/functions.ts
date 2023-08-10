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

export function cloneRepo(envshh: EnvshhInstanceType) {
  if (!envshh.mainRepoUrl) {
    log.error("Repository URL is not defined.");
    process.exit(1);
  }
  if (isRepositoryExistsOnRemote(envshh.mainRepoUrl) === false) {
    log.error("Repository does not exist on Remote.");
    process.exit(1);
  }
  if (
    isPathExists(envshh.mainDirectory) === true &&
    isDirectoryEmpty(envshh.mainDirectory) === false
  ) {
    log.error(
      `Directory ${envshh.mainDirectory} already exists. But it is not empty. It is not safe to clone here.`,
    );
    process.exit(1);
  }

  try {
    execSync(`git clone ${envshh.mainRepoUrl} ${envshh.mainDirectory}`);
    return true;
  } catch (error) {
    log.error("Failed to clone master repository.");
    process.exit(1);
  }
}

export function pullRepo(envshh: EnvshhInstanceType) {
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
          "Your configuration specifies to merge with the ref 'refs/heads/main'",
        )
    ) {
      // deleteDirectoryOrFile(envshh.mainDirectory);
      execSync(
        `echo "# Envshh Instance ${envshh.name}" >> README.md && git add . && git branch -M main && git commit -m "first commit" && git push -u origin main`,
      );
    }
    log.error("Failed to pull master repository.");
    process.exit(1);
  }
}

export function commitRepo(envshh: EnvshhInstanceType) {
  try {
    execSync(`git -C ${envshh.mainDirectory} add .`);
    execSync(
      `git -C ${envshh.mainDirectory} commit -m "${new Date().toUTCString()}"`,
    );
  } catch (error) {
    log.error("Failed to commit changes.");
  }
}

export function pushRepo(envshh: EnvshhInstanceType) {
  try {
    execSync(`git -C ${envshh.mainDirectory} push origin master`);
  } catch (error) {
    log.error("Failed to push.");
  }
}

function getProjectNameFromRepoUrl(url: string) {
  return url.split("/").pop()?.replace(".git", "").trim();
}

export function getGitRepoName(location: string) {
  if (isDirectoryAGitRepository(location)) {
    const origin = execSync("git config --get remote.origin.url").toString();
    return getProjectNameFromRepoUrl(origin) as string;
  }
  return "";
}
