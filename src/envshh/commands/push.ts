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
import { exitWithError } from "../../utils/process.js";

export function thePush(pushConfig: ProjectPushConfigParamsType) {
  const envPaths = getAllEnvsFromEnvPath(pushConfig.envPath);
  if (envPaths.length === 0) {
    exitWithError("No .env found. Consider running envshh push -e <.env-path>");
  }
  const envshh = handleDefaultInstanceForPushNPull(pushConfig.instance);
  if (!pushConfig.offline) {
    envshh.gitPull();
  }
  const destinationDirectory = path.join(
    envshh.getLocalDirectory(),
    pushConfig.name,
    defaultBranchNamePrefix + pushConfig.branch,
  );
  createDirectory(destinationDirectory);
  for (let index = 0; index < envPaths.length; index++) {
    const envPath = envPaths[index];
    const destination = envPath.replace(process.cwd(), destinationDirectory);
    saveEncryptedEnv(envPath, pushConfig.password, destination);
  }
  envshh.gitCommit();
  if (!pushConfig.offline) {
    envshh.gitPush();
  }
}
