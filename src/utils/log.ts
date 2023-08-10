// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { isInDebugMode } from "./checks.js";
import chalk from "chalk";

export class Log {
  readonly logger = process.stdout.write.bind(process.stdout);
  constructor() {
    if (isInDebugMode()) {
      this.logger("Debug mode is on");
    }
  }
  log(message: string) {
    this.logger(message + "\n");
  }
  info(message: string) {
    this.logger(
      chalk.blueBright("Envshh Info: ") + chalk.whiteBright(message) + "\n",
    );
  }
  success(message: string) {
    this.logger(chalk.greenBright("Envshh Success: ") + message + "\n");
  }
  error(message: string) {
    this.logger(chalk.redBright("Envshh Error: " + message) + "\n");
  }
  warn(message: string) {
    this.logger(chalk.yellowBright("Envshh Warning: ") + message + "\n");
  }
}

export const log = new Log();
