// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Argument, Option } from '@commander-js/extra-typings';
import path from 'path';

import { DBgetOnlyInstance } from '../../../db/controllers.js';
import {
  defaultBranchName,
  defaultInstanceName,
  defaultProjectName,
} from '../../../types/defaults.js';

export const projectNameOption = new Option(
  '-p, --project <project-name>',
  'Select a project name. Defaults to GitHub Repo Name or Current Directory Name.',
).default(defaultProjectName);
export const branchNameOption = new Option(
  '-b, --branch <name>',
  `Keep different versions of .envs for different environments like staging, production, etc`,
).default(defaultBranchName);

export const envPathOption = new Option(
  '-e, --env <relative-path>',
  'Specify input directory or file where the .env/.envs is/are located. Defaults to current directory.',
).default(process.cwd());

export const instanceNameOption = new Option(
  '-i, --instance <Instance name.>',
  `Specify the instance name`,
).default(DBgetOnlyInstance()?.getName() || defaultInstanceName);

export const offlineOption = new Option(
  '-o, --offline',
  "Don't push the changes to Remote Repository. Just update the Local Repository.",
).default(false);

export const forceOption = new Option(
  '-y, --yes',
  'Forcefully run the command without asking for confirmation',
).default(false);

export const requiredInstanceNameOption = new Option(
  '-n, --name <name>',
  `Specify the instance name`,
).makeOptionMandatory();

export const localDirectoryOption = new Option(
  '-d, --directory <directory>',
  'Specify the directory path for the instance',
);

export const remoteRepoUrlOption = new Option(
  '-r, --remote <remote-url>',
  'Specify the Remote Repository URL.',
);

export const verboseOption = new Option(
  '--verbose',
  'Show verbose output',
).default(false);

export const inputFileArgument = new Argument(
  '<file>',
  'Specify the input file to encrypt/decrypt',
);

export const outputFileOption = new Option(
  '-o, --output <output>',
  'Specify the output file name/path',
).default(path.join(process.cwd(), 'output.env'));

export const isEnvOption = new Option(
  '-isenv, --isenv',
  'Specify if the file is a .env file',
).default(false);

export const replaceOption = new Option(
  '-r, --replace',
  'Replace the input file with the encrypted/decrypted file',
).default(false);
