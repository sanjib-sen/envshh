// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import { thePull } from "../../envshh/commands/pull.js";
import { askPassword } from "../../utils/password.js";
import {
  branchNameOption,
  instanceNameOption,
  offlineOption,
  projectNameOption,
} from "../common.js";

export const pullCommand = new Command();

pullCommand
  .name("pull")
  .description("Pull environment variables from Local and/or Remote Repository")
  .addOption(projectNameOption)
  .addOption(branchNameOption)
  .addOption(instanceNameOption)
  .addOption(offlineOption)
  .action((options) => {
    const password = askPassword(false);
    thePull({
      password: password,
      name: options.project,
      branch: options.branch,
      offline: options.offline,
      instance: options.instance,
    });
  });
