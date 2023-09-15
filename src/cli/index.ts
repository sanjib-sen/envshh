// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import { defaultDBPath } from "../db/connect.js";
import { envshhAscii } from "../assets/fonts/ascii.js";
import { dbCommand } from "./commands/db.js";
import { instanceCommand } from "./commands/instance.js";
import { pullCommand } from "./commands/pull.js";
import { pushCommand } from "./commands/push.js";
import {
  decryptFileCommand,
  decryptTextCommand,
  encryptFileCommand,
  encryptTextCommand,
} from "./commands/utils.js";
import { removeCommand } from "./commands/remove.js";
import { version } from "../../package.json";
import { cloneCommand } from "./commands/clone.js";
import { generateCommand } from "./commands/generate.js";
import { pipeCommand } from "./commands/pipe.js";

export const program = new Command();
program
  .name("envshh")
  .addHelpText("beforeAll", envshhAscii)
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
