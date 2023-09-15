// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import path from "path";
import { handleDefaultInstanceForPushNPull } from "../../db/controllers.js";
import { ProjectConfigParansType } from "../../types/params.js";
import { defaultBranchNamePrefix } from "../../types/defaults.js";
import { getAllEnvsFromRemoteRepo } from "../../envshh/functions/get.js";
import { saveDecryptedEnv } from "../../envshh/functions/decrypt.js";
import { isDirectoryEmpty, isPathExists } from "../../filesystem/checks.js";
import { exitWithError } from "../../utils/process.js";
import { log } from "../../utils/log.js";

export function thePull(pushConfig: ProjectConfigParansType) {
  const envshh = handleDefaultInstanceForPushNPull(pushConfig.instance);
  if (!pushConfig.offline && envshh.getRemoteRepoUrl()) {
    const destinationUrl =
      envshh.getRemoteRepoUrl()?.replaceAll(".git", "") +
      "/tree/main/" +
      path.join(pushConfig.name, defaultBranchNamePrefix + pushConfig.branch);
    log.info(`Pulling from ${destinationUrl}. Please wait...`);
    envshh.gitPull();
  } else {
    log.info(
      `Getting and decrypting .envs from ${envshh.getLocalDirectory()}...`,
    );
  }

  const sourceDirectory = path.join(
    envshh.getLocalDirectory(),
    pushConfig.name,
    defaultBranchNamePrefix + pushConfig.branch,
  );
  if (!isPathExists(sourceDirectory) || isDirectoryEmpty(sourceDirectory))
    return exitWithError(
      `No .env found. Are you sure about the Project Name and Branch name? Or even the instance?`,
    );
  const envPaths = getAllEnvsFromRemoteRepo(sourceDirectory);
  for (let index = 0; index < envPaths.length; index++) {
    const envPath = envPaths[index];
    const destination = envPath.replace(sourceDirectory, process.cwd());
    saveDecryptedEnv(envPath, pushConfig.password, destination);
  }
  log.success(`Decrypted .envs are saved to ${process.cwd()}`);
}
