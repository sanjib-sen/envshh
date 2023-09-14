// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import { clearDB } from "../envshh/commands/db/clear.js";
import { syncDB } from "../envshh/commands/db/sync.js";
import { showDB } from "../envshh/commands/db/show.js";
import { forceOption, verboseAction, verboseOption } from "./common.js";

export const dbCommand = new Command();

dbCommand.name("db").description("[Advanced] Manage Instance database");
dbCommand
  .command("show")
  .description("Show the instances Database")
  .option(
    "-i, --instance <name>",
    "Show only instance <instance-name> Default: All",
  )
  .addOption(verboseOption)
  .action((options) => {
    verboseAction(options.verbose);
    showDB(options.instance);
  });
dbCommand
  .command("sync")
  .description("Remove all deleted or moved instances from database")
  .addOption(verboseOption)
  .action((opts) => {
    verboseAction(opts.verbose);
    syncDB();
  });
dbCommand
  .command("clear")
  .description("[Careful] Reset and clear everything")
  .addOption(forceOption)
  .addOption(verboseOption)
  .action((option) => {
    verboseAction(option.verbose);
    clearDB(option.yes);
  });
