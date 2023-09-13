// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import figlet from "figlet";
import { Command } from "@commander-js/extra-typings";
import { defaultDBPath } from "../db/db.js";
import { standard } from "../assets/fonts/standard.js";
import { dbCommand } from "./db.js";
import { instanceCommand } from "./instance.js";
import { pullCommand } from "./main/pull.js";
import { pushCommand } from "./main/push.js";
import {
  cloneCommand,
  decryptFileCommand,
  decryptTextCommand,
  encryptFileCommand,
  encryptTextCommand,
  generateCommand,
  pipeCommand,
} from "./utils.js";
import { removeCommand } from "./main/remove.js";
import { version } from "./version.js";
figlet.parseFont("Standard", standard);
export const program = new Command();
program
  .name("envshh")
  .addHelpText(
    "beforeAll",
    figlet.textSync("envshh", {
      font: "Standard",
    }),
  )
  .description(
    `A command line tool to securely and automatically manage, store environment variables.\nMade by Sanjib Sen <mail@sanjibsen.com> \nGitHub: https://github.com/sanjib-sen/envshh \n\nConfiguration file location: ${defaultDBPath}`,
  )
  .version(version, "-v, --version");

program
  .addCommand(pushCommand)
  .addCommand(pullCommand)
  .addCommand(generateCommand)
  .addCommand(pipeCommand)
  .addCommand(cloneCommand)
  .addCommand(removeCommand)
  .addCommand(encryptFileCommand)
  .addCommand(encryptTextCommand)
  .addCommand(decryptFileCommand)
  .addCommand(decryptTextCommand)
  .addCommand(dbCommand)
  .addCommand(instanceCommand);
