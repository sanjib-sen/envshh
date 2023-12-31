// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { execSync } from 'child_process';

import { isInVerboseMode } from './checks.js';
import { log } from './log.js';
import { exitProcess } from './process.js';

export function runCommand(
  command: string,
  ignoreIfFails = false,
  showOnTerminal = false,
) {
  let result;
  if (isInVerboseMode()) {
    log.commandRun(command);
  }
  try {
    result = execSync(command, {
      stdio: [
        'ignore',
        showOnTerminal ? 'inherit' : 'pipe',
        showOnTerminal ? 'inherit' : 'pipe',
      ],
    })
      .toString('utf-8')
      .trim();
    if (isInVerboseMode()) {
      log.commandOutput(result);
    }
    return result;
  } catch (error) {
    if (ignoreIfFails) {
      return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let theError: string = (error as any).stderr
      .toString()
      .trim()
      .split('\n')
      .join(' ');
    if (!command.includes('\n'))
      theError = theError.replaceAll('/bin/sh: line 1: ', '');
    log.error('Got error while running command: ' + command);
    log.commandError(theError);
    exitProcess();
  }
}
