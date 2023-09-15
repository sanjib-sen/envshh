// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import path from 'path';

import { DBgetInstance } from '../../db/controllers.js';
import { getAllEnvsFromEnvPath } from '../../envshh/functions/get.js';
import { deleteDirectoryOrFile } from '../../filesystem/functions.js';
import { defaultBranchNamePrefix } from '../../types/defaults.js';
import { ProjectPushConfigParamsType } from '../../types/params.js';

export function theRemove(
  removeConfig: Omit<ProjectPushConfigParamsType, 'password'>,
) {
  const envshh = DBgetInstance(removeConfig.instance);
  if (!removeConfig.offline) {
    envshh.gitPull();
  }
  const envPaths = getAllEnvsFromEnvPath(removeConfig.envPath);
  const destinationDirectory = path.join(
    envshh.getLocalDirectory(),
    removeConfig.name,
    defaultBranchNamePrefix + removeConfig.branch,
  );
  for (let index = 0; index < envPaths.length; index++) {
    const envPath = envPaths[index];
    const destination = envPath.replace(process.cwd(), destinationDirectory);
    deleteDirectoryOrFile(destination);
    deleteDirectoryOrFile(envPath);
  }
  envshh.gitCommit();
  if (!removeConfig.offline) {
    envshh.gitPush();
  }
}
