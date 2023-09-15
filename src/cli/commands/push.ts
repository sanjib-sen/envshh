// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Command } from '@commander-js/extra-typings';

import { askPassword } from '../../utils/password.js';
import { thePush } from '../handlers/push.js';
import { verboseAction } from './common/actions.js';
import {
  branchNameOption,
  envPathOption,
  instanceNameOption,
  offlineOption,
  projectNameOption,
  verboseOption,
} from './common/options.js';

export const pushCommand = new Command();

pushCommand
  .name('push')
  .description(
    'Push local environment variables to Local and/or Remote Repository',
  )
  .option('-m, --message <message>', 'Commit Message')
  .addOption(projectNameOption)
  .addOption(branchNameOption)
  .addOption(envPathOption)
  .addOption(instanceNameOption)
  .addOption(offlineOption)
  .addOption(verboseOption)
  .action((options) => {
    verboseAction(options.verbose);
    const password = askPassword(true);
    thePush({
      message: options.message,
      password: password,
      name: options.project,
      envPath: options.env.split(','),
      branch: options.branch,
      offline: options.offline,
      instance: options.instance,
    });
  });
