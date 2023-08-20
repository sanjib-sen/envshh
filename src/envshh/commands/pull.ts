// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import path from "path";
import { DBgetInstance } from "../../db/controllers.js";
import { ProjectConfigParansType } from "../../types/params.js";
import { defaultBranchNamePrefix } from "../defaults/defaults.js";
import { getAllEnvsFromMainRepo } from "../envs/get.js";
import { saveDecryptedEnv } from "../encryption/decrypt.js";

export function thePull(pushConfig: ProjectConfigParansType) {
  const envshh = DBgetInstance(pushConfig.instance);
  if (!pushConfig.offline || envshh.isMainRepoUrlSet()) {
    envshh.gitPull();
  }

  const sourceDirectory = path.join(
    envshh.getMainDirectory(),
    pushConfig.name,
    defaultBranchNamePrefix + pushConfig.branch
  );

  const envPaths = getAllEnvsFromMainRepo(sourceDirectory);

  for (let index = 0; index < envPaths.length; index++) {
    const envPath = envPaths[index];
    const destination = envPath.replace(sourceDirectory, process.cwd());
    saveDecryptedEnv(envPath, pushConfig.password, destination);
  }
}
