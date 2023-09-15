// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { log } from './log.js';

export function exitWithWarning(message: string) {
  log.warn(message);
  return process.exit(0);
}
export function exitWithError(message: string) {
  log.error(message);
  return process.exit(1);
}
export function exitWithSuccess(message: string) {
  log.success(message);
  return process.exit(0);
}

export function exitProcess(message?: string) {
  message && log.info(message);
  return process.exit(0);
}
