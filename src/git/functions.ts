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
      "Directory already exists. But it is not empty. It is not safe to clone here."
    );
    process.exit(1);
  }

  try {
    execSync(`git clone ${envshh.mainDirectory} ${envshh.mainRepoUrl}`);
    return true;
  } catch (error) {
    log.error("Failed to clone master repository.");
  }
}

export function pullRepo(envshh: EnvshhInstanceType) {
  try {
    execSync(`git -C ${envshh.mainDirectory} pull`);
  } catch (error) {
    log.error("Failed to pull master repository.");
  }
}

export function commitRepo(envshh: EnvshhInstanceType) {
  try {
    execSync(`git -C ${envshh.mainDirectory} add .`);
    execSync(
      `git -C ${envshh.mainDirectory} commit -m "${new Date().toUTCString()}"`
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
  return url.split("/").pop()?.replace(".git", "");
}

export function getGitRepoName(location: string) {
  if (isDirectoryAGitRepository(location)) {
    const origin = execSync("git config --get remote.origin.url").toString();
    return getProjectNameFromRepoUrl(origin) as string;
  }
  return "";
}
