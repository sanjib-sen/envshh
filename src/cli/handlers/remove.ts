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
import { log } from '../../utils/log.js';

export function theRemove(
  removeConfig: Omit<ProjectPushConfigParamsType, 'password'>,
) {
  const envshh = DBgetInstance(removeConfig.instance);
  if (!removeConfig.offline && envshh.getRemoteRepoUrl()) {
    log.info(`Syncing with ${envshh.getRemoteRepoUrl()}. Please wait...`);
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
  if (!removeConfig.offline && envshh.getRemoteRepoUrl()) {
    const destinationUrl =
      envshh.getRemoteRepoUrl()?.replaceAll('.git', '') +
      '/tree/main/' +
      path.join(
        removeConfig.name,
        defaultBranchNamePrefix + removeConfig.branch,
      );
    log.info(`Removing from ${destinationUrl}. Please wait...`);
    envshh.gitPush();
    log.success(`Encrypted .envs are removed from ${destinationUrl}`);
  } else {
    log.success(`Encrypted .envs are removed from ${destinationDirectory}`);
  }
}
