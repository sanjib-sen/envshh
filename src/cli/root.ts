// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import figlet from "figlet";
import { Command } from "@commander-js/extra-typings";
import * as fs from "fs";
import { defaultDBPath } from "../db/db.js";

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
} from "./utils.js";
import { removeCommand } from "./main/remove.js";

const fileUrl = new URL("../package.json", import.meta.url);
const packageInfo = JSON.parse(fs.readFileSync(fileUrl, "utf8"));

export const program = new Command();

program
  .name("envshh")
  .addHelpText("beforeAll", figlet.textSync("envshh"))
  .description(
    `A command line tool to securely and automatically manage, store environment variables.\nMade by Sanjib Sen <mail@sanjibsen.com> \nGitHub: https://github.com/sanjib-sen/envshh \n\nConfiguration file location: ${defaultDBPath}`,
  )
  .option("--debug", "Run in Debug Mode", false)
  .version(packageInfo.version, "-v, --version");
program
  .addCommand(pushCommand)
  .addCommand(pullCommand)
  .addCommand(generateCommand)
  .addCommand(cloneCommand)
  .addCommand(removeCommand)
  .addCommand(encryptFileCommand)
  .addCommand(encryptTextCommand)
  .addCommand(decryptFileCommand)
  .addCommand(decryptTextCommand)
  .addCommand(dbCommand)
  .addCommand(instanceCommand);
