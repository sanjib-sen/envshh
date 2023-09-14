// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import { removeInstance } from "../envshh/commands/instance/remove.js";
import { resetInstance } from "../envshh/commands/instance/reset.js";
import { createInstance } from "../envshh/commands/instance/create.js";
import { editInstance } from "../envshh/commands/instance/edit.js";
import {
  forceOption,
  instanceNameOption,
  localDirectoryOption,
  remoteRepoUrlOption,
  verboseAction,
  verboseOption,
} from "./common.js";

export const instanceCommand = new Command();

instanceCommand.name("instance").description("[Advanced] Manage Instances");
instanceCommand
  .command("create")
  .description(
    "Create an instance. Use this command without any option to create in interactive mode",
  )
  .addOption(instanceNameOption)
  .addOption(localDirectoryOption)
  .addOption(remoteRepoUrlOption)
  .addOption(verboseOption)
  .addOption(forceOption)
  .action((options) => {
    verboseAction(options.verbose);
    createInstance(
      {
        name: options.instance,
        localDirectory: options.directory,
        remoteRepoUrl: options.remote,
      },
      options.yes,
    );
  });
instanceCommand
  .command("edit")
  .description(
    "Modify an instance. Run this command without any option to edit in interactive mode",
  )
  .addOption(instanceNameOption.makeOptionMandatory())
  .option("--new-name <new-ame>", "Specify the new name for the instance")
  .addOption(localDirectoryOption)
  .addOption(remoteRepoUrlOption)
  .addOption(verboseOption)
  .action((options) => {
    verboseAction(options.verbose);
    editInstance(options.instance, {
      name: options.newName,
      localDirectory: options.directory,
      remoteRepoUrl: options.remote,
    });
  });
instanceCommand
  .command("remove")
  .description("Delete the instance data")
  .addOption(instanceNameOption.makeOptionMandatory())
  .addOption(forceOption)
  .addOption(verboseOption)
  .action((options) => {
    verboseAction(options.verbose);
    removeInstance(options.instance, options.yes);
  });
instanceCommand
  .command("reset")
  .description("Reset the instance")
  .addOption(instanceNameOption.makeOptionMandatory())
  .addOption(forceOption)
  .addOption(verboseOption)
  .action((options) => {
    verboseAction(options.verbose);
    resetInstance(options.instance, options.yes);
  });
