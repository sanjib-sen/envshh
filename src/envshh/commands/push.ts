// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import path from "path";
import { handleDefaultInstanceForPushNPull } from "../../db/controllers.js";
import { ProjectPushConfigParamsType } from "../../types/params.js";
import { getAllEnvsFromEnvPath } from "../envs/get.js";
import { defaultBranchNamePrefix } from "../defaults/defaults.js";
import { createDirectory } from "../../filesystem/functions.js";
import { saveEncryptedEnv } from "../encryption/encrypt.js";
import { log } from "../../utils/log.js";

export function thePush(pushConfig: ProjectPushConfigParamsType) {
  const envshh = handleDefaultInstanceForPushNPull(pushConfig.instance);
  if (!pushConfig.offline && envshh.isMainRepoUrlSet()) {
    envshh.gitPull();
  }
  const envPaths = getAllEnvsFromEnvPath(pushConfig.envPath);
  const destinationDirectory = path.join(
    envshh.getMainDirectory(),
    pushConfig.name,
    defaultBranchNamePrefix + pushConfig.branch,
  );
  createDirectory(destinationDirectory);
  for (let index = 0; index < envPaths.length; index++) {
    const envPath = envPaths[index];
    const destination = envPath.replace(process.cwd(), destinationDirectory);
    log.info(`Pushing ${envPaths} to ${destinationDirectory}`);
    saveEncryptedEnv(envPath, pushConfig.password, destination);
  }
  envshh.gitCommit();
  if (!pushConfig.offline && envshh.isMainRepoUrlSet()) {
    envshh.gitPush();
  }
}
