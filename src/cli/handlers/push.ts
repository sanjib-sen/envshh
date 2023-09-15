// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import path from 'path';

import { handleDefaultInstanceForPushNPull } from '../../db/controllers.js';
import { saveEncryptedEnv } from '../../envshh/functions/encrypt.js';
import { getAllEnvsFromEnvPath } from '../../envshh/functions/get.js';
import { createDirectory } from '../../filesystem/functions.js';
import { defaultBranchNamePrefix } from '../../types/defaults.js';
import { ProjectPushConfigParamsType } from '../../types/params.js';
import { log } from '../../utils/log.js';
import { exitWithError } from '../../utils/process.js';

export function thePush(pushConfig: ProjectPushConfigParamsType) {
  const envPaths = getAllEnvsFromEnvPath(pushConfig.envPath);
  if (envPaths.length === 0) {
    exitWithError('No .env found. Consider running envshh push -e <.env-path>');
  }
  const envshh = handleDefaultInstanceForPushNPull(
    pushConfig.instance,
    pushConfig.offline,
    pushConfig.message,
  );
  if (!pushConfig.offline && envshh.getRemoteRepoUrl()) {
    log.info(`Syncing with ${envshh.getRemoteRepoUrl()}. Please wait...`);
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
  envshh.gitCommit(pushConfig.message);
  if (!pushConfig.offline && envshh.getRemoteRepoUrl()) {
    log.info(`Pushing to ${envshh.getRemoteRepoUrl()}. Please wait...`);
    envshh.gitPush();
    const destinationUrl =
      envshh.getRemoteRepoUrl()?.replaceAll('.git', '') +
      '/tree/main/' +
      path.join(pushConfig.name, defaultBranchNamePrefix + pushConfig.branch);
    log.success(`Encrypted .envs are pushed to ${destinationUrl}`);
  } else {
    log.success(`Encrypted .envs are saved to ${destinationDirectory}`);
  }
}
