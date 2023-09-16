// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { execSync } from 'child_process';
import path from 'path';

import { EnvshhInstance } from '../envshh/class.js';
import { isDirectoryEmpty, isPathExists } from '../filesystem/checks.js';
import { EnvshhInstanceType } from '../types/schemas.js';
import { isInVerboseMode } from '../utils/checks.js';
import { handleError } from '../utils/error.js';
import { log } from '../utils/log.js';
import { exitWithError } from '../utils/process.js';
import { runCommand } from '../utils/shell.js';
import {
  isDirectoryAGitRepository,
  isRepositoryExistsOnRemote,
} from './checks.js';

export function cloneRepo(envshh: EnvshhInstanceType) {
  log.info(
    `Cloning ${envshh.remoteRepoUrl} to ${envshh.localDirectory}. Please wait...`,
  );
  log.flow(`Git cloning ${envshh.remoteRepoUrl} to ${envshh.localDirectory}`);
  if (!envshh.remoteRepoUrl) {
    return exitWithError('Repository URL is not defined.');
  }
  if (isRepositoryExistsOnRemote(envshh.remoteRepoUrl) === false) {
    return exitWithError('Repository does not exist on Remote.');
  }
  if (
    isPathExists(envshh.localDirectory) === true &&
    isDirectoryEmpty(envshh.localDirectory) === false
  ) {
    return exitWithError(
      `Directory ${envshh.localDirectory} already exists. But it is not empty. It is not safe to clone here.`,
    );
  }
  runCommand(`git clone ${envshh.remoteRepoUrl} ${envshh.localDirectory}`);
}

export function pullRepo(envshh: EnvshhInstanceType) {
  log.flow(
    `Executing a Git Pull on ${envshh.localDirectory} from ${envshh.remoteRepoUrl}`,
  );
  const pullCommand = `git -C ${envshh.localDirectory} pull origin main`;
  if (isInVerboseMode()) {
    log.commandRun(pullCommand);
  }
  try {
    const res = execSync(pullCommand, {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (isInVerboseMode()) {
      log.commandOutput(res?.toString('utf-8').trim());
    }
  } catch (error) {
    if (
      (error instanceof Error &&
        error
          .toString()
          .trim()
          .includes(
            "Your configuration specifies to merge with the ref 'refs/heads/main'",
          )) ||
      (error instanceof Error &&
        error.toString().trim().includes("couldn't find remote ref main"))
    ) {
      log.flow(`Git is not initiated. Will try to execute a git init`);
      initRepo(envshh);
      log.flow(`Git is initiated. Will try to execute a git pull again`);
      runCommand(`git -C ${envshh.localDirectory} pull origin main`);
    } else {
      return handleError(error);
    }
  }
}

export function addRemoteRepo(envshh: EnvshhInstanceType) {
  log.flow(`Adding Remote Url ${envshh.remoteRepoUrl} as origin`);
  runCommand(
    `git -C ${envshh.localDirectory} remote add origin ${envshh.remoteRepoUrl}`,
  );
}

export function initRepo(envshh: EnvshhInstanceType, commitMessage?: string) {
  log.flow(`Initiating Repo`);
  runCommand(`git -C ${envshh.localDirectory} init`);
  envshh.remoteRepoUrl ?? addRemoteRepo(envshh);
  runCommand(`git -C ${envshh.localDirectory} branch -M main`);
  runCommand(
    `echo "# Envshh Instance: ${envshh.name.toUpperCase()}" >> ${path.join(
      envshh.localDirectory,
      'README.md',
    )}`,
  );
  const tempInstance = new EnvshhInstance(envshh);
  tempInstance.gitCommit(commitMessage);
  envshh.remoteRepoUrl ? tempInstance.gitPush() : '';
}

export function commitRepo(envshh: EnvshhInstanceType, message?: string) {
  log.flow(`Executing a git commit on ${envshh.localDirectory}`);
  runCommand(`git -C ${envshh.localDirectory} add .`);
  runCommand(
    `git -C ${envshh.localDirectory} commit -m "${
      message || new Date().toUTCString()
    }"`,
  );
}

export function pushRepo(envshh: EnvshhInstanceType) {
  log.flow(
    `Executing a git push on ${envshh.localDirectory} to ${envshh.remoteRepoUrl}`,
  );
  runCommand(`git -C ${envshh.localDirectory} push origin main`);
}

export function getProjectNameFromRepoUrl(url: string) {
  log.flow(`Getting Project Name from Repo Url ${url}`);
  const projectName = url.split('/').pop()?.replace('.git', '').trim();
  if (!projectName) {
    return exitWithError(`Error getting project name from ${url}`);
  }
  log.flow(`Project Name: ${projectName}`);
  return projectName;
}

export function getGitRepoName(location: string) {
  log.flow(`Getting Git Repo Name from ${location}`);
  if (isDirectoryAGitRepository(location)) {
    const origin = runCommand('git config --get remote.origin.url', true);
    const repoName = origin ? getProjectNameFromRepoUrl(origin) : undefined;
    log.flow(`Git Repo Name: ${repoName}`);
    return repoName;
  }
  return undefined;
}
