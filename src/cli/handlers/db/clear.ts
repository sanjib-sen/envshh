// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import * as readlineSync from 'readline-sync';

import { DBClear } from '../../../db/controllers.js';
import { log } from '../../../utils/log.js';

export function clearDB(yes: boolean) {
  if (yes) {
    return DBClear();
  }
  const confirm = readlineSync.question(
    `Are you sure you want to clear the Envshh Database and Configuration? (y/N): `,
  );
  if (confirm === 'y') {
    DBClear();
    return log.success('Removed everything!');
  }
  log.info('Aborted!');
}
