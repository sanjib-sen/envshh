// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import * as fs from 'fs';
import path from 'path';

import { isPathADirectory, isPathExists } from '../../filesystem/checks.js';
import { envExtensions } from '../../types/defaults.js';
import { log } from '../../utils/log.js';

function getListOfEnvsInDirectory(directory: string) {
  log.flow(`Getting list of envs in directory ${directory}`);
  const envs = [];
  for (let index = 0; index < envExtensions.length; index++) {
    const envExtension = envExtensions[index];
    const env = path.join(directory, envExtension);
    if (isPathExists(env) && !isPathADirectory(env)) {
      envs.push(env);
    }
  }
  log.flow(
    `Found ${envs.length} envs in directory ${directory}. \n ${envs.join(' ')}`,
  );
  return envs;
}

export function getAllEnvsFromEnvPath(envPaths: string[]) {
  log.flow(`Getting all envs from env path ${envPaths.join(' ')}`);
  if (envPaths[0] != process.cwd()) {
    envPaths.map(
      (fileOrDirectory, index) =>
        (envPaths[index] = path.join(process.cwd(), fileOrDirectory)),
    );
  }
  const filesAndDirectories = envPaths;
  const envs: string[] = [];
  filesAndDirectories.map((fileOrDirectory) => {
    if (isPathADirectory(fileOrDirectory)) {
      envs.push(...getListOfEnvsInDirectory(fileOrDirectory));
    }
    if (isPathExists(fileOrDirectory) && !isPathADirectory(fileOrDirectory)) {
      envs.push(fileOrDirectory);
    }
  });
  return envs;
}

export function getAllEnvsFromRemoteRepo(
  directoryPath: string,
  arrayOfFiles: string[] = [],
) {
  log.flow(`Getting all envs from local repo ${directoryPath}`);
  const files = fs.readdirSync(directoryPath);
  files.forEach(function (file) {
    if (fs.statSync(directoryPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllEnvsFromRemoteRepo(
        directoryPath + '/' + file,
        arrayOfFiles,
      );
    } else {
      arrayOfFiles.push(path.join(directoryPath, file));
    }
  });
  log.flow(
    `Found ${
      arrayOfFiles.length
    } envs in local repo ${directoryPath}. \n ${arrayOfFiles.join(' ')}`,
  );
  return arrayOfFiles;
}
