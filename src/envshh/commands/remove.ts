// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import path from "path";
import { handleDefaultInstanceForPushNPull } from "../../db/controllers.js";
import { ProjectPushConfigParamsType } from "../../types/params.js";
import { getAllEnvsFromEnvPath } from "../envs/get.js";
import { defaultBranchNamePrefix } from "../defaults/defaults.js";
import { deleteDirectoryOrFile } from "../../filesystem/functions.js";

export function theRemove(
  removeConfig: Omit<ProjectPushConfigParamsType, "password">,
) {
  const envshh = handleDefaultInstanceForPushNPull(removeConfig.instance);
  if (!removeConfig.offline) {
    envshh.gitPull();
  }
  const envPaths = getAllEnvsFromEnvPath(removeConfig.envPath);
  const destinationDirectory = path.join(
    envshh.getMainDirectory(),
    removeConfig.name,
    defaultBranchNamePrefix + removeConfig.branch,
  );
  for (let index = 0; index < envPaths.length; index++) {
    const envPath = envPaths[index];
    deleteDirectoryOrFile(envPath);
    const destination = envPath.replace(process.cwd(), destinationDirectory);
    deleteDirectoryOrFile(destination);
  }
  envshh.gitCommit();
  if (!removeConfig.offline) {
    envshh.gitPush();
  }
}
