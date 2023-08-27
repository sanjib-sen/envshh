// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import path from "path";
import { handleDefaultInstanceForPushNPull } from "../../db/controllers.js";
import { ProjectConfigParansType } from "../../types/params.js";
import { defaultBranchNamePrefix } from "../defaults/defaults.js";
import { getAllEnvsFromRemoteRepo } from "../envs/get.js";
import { saveDecryptedEnv } from "../encryption/decrypt.js";
import { isDirectoryEmpty, isPathExists } from "../../filesystem/checks.js";
import { exitWithError } from "../../utils/process.js";

export function thePull(pushConfig: ProjectConfigParansType) {
  const envshh = handleDefaultInstanceForPushNPull(pushConfig.instance);
  if (!pushConfig.offline) {
    envshh.gitPull();
  }

  const sourceDirectory = path.join(
    envshh.getLocalDirectory(),
    pushConfig.name,
    defaultBranchNamePrefix + pushConfig.branch,
  );

  if (!isPathExists(sourceDirectory) || isDirectoryEmpty(sourceDirectory))
    return exitWithError(`No envs found.`);

  const envPaths = getAllEnvsFromRemoteRepo(sourceDirectory);

  for (let index = 0; index < envPaths.length; index++) {
    const envPath = envPaths[index];
    const destination = envPath.replace(sourceDirectory, process.cwd());
    saveDecryptedEnv(envPath, pushConfig.password, destination);
  }
}
