// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import { removeInstance } from "../envshh/commands/instance/remove.js";
import { resetInstance } from "../envshh/commands/instance/reset.js";
import { defaultInstanceName } from "../envshh/defaults/defaults.js";
import { createInstance } from "../envshh/commands/instance/create.js";
import { editInstance } from "../envshh/commands/instance/edit.js";

export const instanceCommand = new Command();

instanceCommand.name("instance").description("[Advanced] Manage Instances");
instanceCommand
  .command("create")
  .description(
    "[Advanced] Create an instance. Use this command to create a new instance in interactive mode.",
  )
  .option("-n, --name <name>", `Specify the instance name.`)
  .option(
    "-d, --directory <directory>",
    "[Advanced] Specify the directory path for the instance.",
  )
  .option(
    "-r, --remote <remote-url>",
    "Specify the Remote Repository URL. Keep this blank if you want to use this instance offline.",
  )
  .action((options) => {
    createInstance({
      name: options.name,
      mainDirectory: options.directory,
      mainRepoUrl: options.remote,
    });
  });
instanceCommand
  .command("edit")
  .description("[Advanced] Modify an instance.")
  .requiredOption("-n, --name <name>", `Specify the instance name.`)
  .option("--new-name <new-ame>", "Specify the new name for the instance.")
  .option(
    "--directory <directory-path>",
    "Modify the directory path for the instance.",
  )
  .option("--remote <remote-url>", "Modify the Remote Repository URL.")
  .action((options) => {
    editInstance(options.name, {
      name: options.newName,
      mainDirectory: options.directory,
      mainRepoUrl: options.remote,
    });
  });
instanceCommand
  .command("remove")
  .description("[Advanced][Careful] Delete the instance data.")
  .requiredOption(
    "-n, --name <name>",
    `Specify the instance name.`,
    defaultInstanceName,
  )
  .action((options) => {
    removeInstance(options.name);
  });
instanceCommand
  .command("reset")
  .description("[Advanced][Careful] Reset the instance.")
  .option(
    "-n, --name <name>",
    `Specify the instance name.`,
    defaultInstanceName,
  )
  .action((options) => {
    resetInstance(options.name);
  });
