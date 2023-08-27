// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import { clearDB } from "../envshh/commands/db/clear.js";
import { syncDB } from "../envshh/commands/db/sync.js";
import { showDB } from "../envshh/commands/db/show.js";

export const dbCommand = new Command();

dbCommand.name("db").description("[Advanced] Manage Instance database");
dbCommand
  .command("show")
  .description("Show the instances Database")
  .option(
    "-i, --instance <name>",
    "Show only instance <instance-name>. Default: All"
  )
  .action((options) => {
    showDB(options.instance);
  });
dbCommand
  .command("sync")
  .description(
    "[Advanced] Remove all deleted or moved instances from database."
  )
  .action(() => {
    syncDB();
  });
dbCommand
  .command("clear")
  .description("[Advanced][Careful] Remove all instances from Database")
  .option("-y, --yes", "Force clear the database without confirmation.", false)
  .action((option) => {
    clearDB(option.yes);
  });
