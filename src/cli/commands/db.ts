// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Command } from '@commander-js/extra-typings';

import { clearDB } from '../handlers/db/clear.js';
import { showDB } from '../handlers/db/show.js';
import { syncDB } from '../handlers/db/sync.js';
import { verboseAction } from './common/actions.js';
import { forceOption, verboseOption } from './common/options.js';

export const dbCommand = new Command();

dbCommand.name('db').description('[Advanced] Manage Instance database');
dbCommand
  .command('show')
  .description('Show the instances Database')
  .option(
    '-i, --instance <name>',
    'Show only instance <instance-name> Default: All',
  )
  .addOption(verboseOption)
  .action((options) => {
    verboseAction(options.verbose);
    showDB(options.instance);
  });
dbCommand
  .command('sync')
  .description('Remove all deleted or moved instances from database')
  .addOption(verboseOption)
  .action((opts) => {
    verboseAction(opts.verbose);
    syncDB();
  });
dbCommand
  .command('clear')
  .description('Reset and clear everything')
  .addOption(forceOption)
  .addOption(verboseOption)
  .action((option) => {
    verboseAction(option.verbose);
    clearDB(option.yes);
  });
