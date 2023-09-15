// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import { theRemove } from "../handlers/remove.js";
import * as readlineSync from "readline-sync";
import {
  branchNameOption,
  forceOption,
  envPathOption,
  instanceNameOption,
  offlineOption,
  projectNameOption,
  verboseOption,
} from "./common/options.js";

import { verboseAction } from "./common/actions.js";

export const removeCommand = new Command();

removeCommand
  .name("remove")
  .description("Delete .envs from Local and/or Remote Repository")
  .addOption(projectNameOption)
  .addOption(branchNameOption)
  .addOption(envPathOption)
  .addOption(instanceNameOption)
  .addOption(offlineOption)
  .addOption(forceOption)
  .addOption(verboseOption)
  .action((options) => {
    verboseAction(options.verbose);
    if (!options.yes) {
      const confirm = readlineSync.question(
        "Are you sure you want to delete .envs from local and Remote Repository? (y/N): ",
      );
      if (confirm !== "y") {
        process.exit(0);
      }
    }
    theRemove({
      name: options.project,
      envPath: options.env.split(","),
      branch: options.branch,
      offline: options.offline,
      instance: options.instance,
    });
  });
