// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { DBSync } from '../../../db/controllers.js';
import { log } from '../../../utils/log.js';

export function syncDB() {
  DBSync();
  return log.success('Database synced!');
}
