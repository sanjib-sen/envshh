// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Command } from '@commander-js/extra-typings';

import { getProjectNameFromRepoUrl } from '../../git/functions.js';
import { defaultProjectName } from '../../types/defaults.js';
import { askPassword } from '../../utils/password.js';
import { runCommand } from '../../utils/shell.js';
import { thePull } from '../handlers/pull.js';
import {
  branchNameOption,
  instanceNameOption,
  offlineOption,
  projectNameOption,
} from './common/options.js';

export const cloneCommand = new Command();
cloneCommand
  .name('clone')
  .description('git clone and envshh pull at the same time')
  .argument('<repo>', 'Repository url')
  .argument('[directory]', 'Directory name')
  .addOption(projectNameOption)
  .addOption(branchNameOption)
  .addOption(instanceNameOption)
  .addOption(offlineOption)
  .allowUnknownOption()
  .action((repo, directory, options) => {
    if (!directory) {
      directory = getProjectNameFromRepoUrl(repo);
    }
    runCommand(
      `git -C ${process.cwd()} clone ${repo} ${directory}`,
      true,
      true,
    );
    process.chdir(directory);
    const password = askPassword(false);
    thePull({
      password: password,
      name: options.project || defaultProjectName,
      branch: options.branch,
      offline: options.offline,
      instance: options.instance,
    });
  });
