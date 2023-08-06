// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { isInDebugMode } from "./checks.js";
import chalk from "chalk";

export class Log {
  readonly log = process.stdout.write.bind(process.stdout);
  constructor() {
    if (isInDebugMode()) {
      this.log("Debug mode is on");
    }
  }
  info(message: string) {
    this.log(
      chalk.blueBright("Envshh Info: ") + chalk.whiteBright(message) + "\n",
    );
  }
  success(message: string) {
    this.log(chalk.greenBright("Envshh Success: ") + message + "\n");
  }
  error(message: string) {
    this.log(chalk.redBright("Envshh Error: " + message) + "\n");
  }
  warn(message: string) {
    this.log(chalk.yellowBright("Envshh Warning: ") + message + "\n");
  }
}

export const log = new Log();
