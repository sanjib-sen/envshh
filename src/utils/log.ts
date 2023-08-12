// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { isInDebugMode } from "./checks.js";
import chalk from "chalk";

export class Log {
  readonly logger = process.stdout.write.bind(process.stdout);
  private masterPrefix = "Envshh";
  constructor(masterPrefix?: string) {
    if (isInDebugMode()) {
      this.logger("Debug mode is on");
    }
    this.masterPrefix = masterPrefix || this.masterPrefix;
  }

  private toStdout(
    prefix: string,
    prefixChalkFunction: chalk.Chalk,
    message: string,
    messageChalkFunction: chalk.Chalk
  ) {
    this.logger(
      `${new Date().toTimeString()} : ${prefixChalkFunction(
        `${this.masterPrefix} ${prefix}`
      )}: ${messageChalkFunction(
        `${message.split("\n").join("-".repeat(prefix.length))} \n`
      )}`
    );
  }

  info(message: string) {
    this.toStdout("Info", chalk.blueBright, message, chalk.white);
  }

  command(message: string) {
    this.toStdout(
      "Command Result",
      chalk.blueBright,
      message,
      chalk.whiteBright
    );
  }
  success(message: string) {
    this.toStdout("Success", chalk.greenBright, message, chalk.whiteBright);
  }
  error(message: string) {
    this.toStdout("Error", chalk.redBright, message, chalk.red);
  }
  warn(message: string) {
    this.toStdout("Warning", chalk.yellowBright, message, chalk.yellow);
  }
}

export const log = new Log();
