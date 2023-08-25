// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import figlet from "figlet";
import { Command } from "@commander-js/extra-typings";
import { dbCommand } from "./db.js";
import { instanceCommand } from "./instance.js";
import { pullCommand } from "./main/pull.js";
import { pushCommand } from "./main/push.js";

export const program = new Command();

program
  .name("envshh")
  .addHelpText("beforeAll", figlet.textSync("envshh"))
  .description(
    "A command line tool to securely and automatically manage, store environment variables.\
    \nMade by Sanjib Sen <mail@sanjibsen.com> \nGitHub: https://github.com/sanjib-sen/envshh",
  )
  .version(
    process.env.npm_package_version ? process.env.npm_package_version : "1.00",
    "-v, --version",
  );

program
  .addCommand(pushCommand)
  .addCommand(pullCommand)
  .addCommand(dbCommand)
  .addCommand(instanceCommand);