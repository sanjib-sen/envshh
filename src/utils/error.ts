// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { log } from "./log.js";
import { exitWithError } from "./process.js";

export function handleError(error: unknown, customMessage?: string) {
  if (customMessage) log.error(customMessage);
  if (error instanceof Error) {
    return exitWithError(`${error.name}: ${error.message}`);
  } else {
    throw new Error(`Unknown error. ${error}`);
  }
}
