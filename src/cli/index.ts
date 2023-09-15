// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Command } from '@commander-js/extra-typings';

import { version } from '../../package.json';
import { envshhAscii } from '../assets/fonts/ascii.js';
import { defaultDBPath } from '../db/connect.js';
import { cloneCommand } from './commands/clone.js';
import { dbCommand } from './commands/db.js';
import { generateCommand } from './commands/generate.js';
import { instanceCommand } from './commands/instance.js';
import { pipeCommand } from './commands/pipe.js';
import { pullCommand } from './commands/pull.js';
import { pushCommand } from './commands/push.js';
import { removeCommand } from './commands/remove.js';
import { utilityCommand } from './commands/utils.js';

export const program = new Command();
program
  .name('envshh')
  .addHelpText('beforeAll', envshhAscii)
  .description(
    `A command line tool to securely and automatically manage, store environment variables.\nMade by Sanjib Sen <mail@sanjibsen.com> \nGitHub: https://github.com/sanjib-sen/envshh \n\nConfiguration file location: ${defaultDBPath}`,
  )
  .version(version, '-v, --version');

program
  .addCommand(pushCommand)
  .addCommand(pullCommand)
  .addCommand(generateCommand)
  .addCommand(pipeCommand)
  .addCommand(cloneCommand)
  .addCommand(removeCommand)
  .addCommand(utilityCommand)
  .addCommand(dbCommand)
  .addCommand(instanceCommand);
