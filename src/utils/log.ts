// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import chalk, { ChalkInstance } from 'chalk';

import { verboseAscii } from '../assets/fonts/ascii.js';
import { isInVerboseMode } from './checks.js';

export class Log {
  readonly logger = process.stdout.write.bind(process.stdout);
  private masterPrefix = 'Envshh';
  constructor(masterPrefix?: string) {
    if (isInVerboseMode()) {
      this.logger(verboseAscii);
    }
    this.masterPrefix = masterPrefix || this.masterPrefix;
  }
  private toStdout(
    prefix: string,
    prefixChalkFunction: ChalkInstance,
    message: string,
    messageChalkFunction: ChalkInstance,
  ) {
    this.logger(
      `${prefixChalkFunction(
        `${this.masterPrefix} ${prefix}`,
      )}: ${messageChalkFunction(`${message}\n`)}`,
    );
  }
  print(message: string) {
    this.logger(message);
  }
  info(message: string) {
    this.toStdout('Info', chalk.blueBright, message, chalk);
  }
  commandOutput(message: string) {
    this.toStdout('Command Output', chalk.blueBright, message, chalk);
  }
  commandRun(message: string) {
    this.toStdout('Running Command', chalk.blueBright, message, chalk);
  }
  flow(message: string) {
    isInVerboseMode()
      ? this.toStdout('Flow', chalk.blueBright, message, chalk)
      : '';
  }
  commandError(message: string) {
    this.toStdout('Command Output', chalk.redBright, message, chalk.red);
  }
  success(message: string) {
    this.toStdout('Success', chalk.greenBright, message, chalk);
  }
  error(message: string) {
    this.toStdout('Error', chalk.redBright, message, chalk.red);
  }
  warn(message: string) {
    this.toStdout('Warning', chalk.yellowBright, message, chalk.yellow);
  }
}

export const log = new Log();
