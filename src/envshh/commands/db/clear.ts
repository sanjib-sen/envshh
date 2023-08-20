// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DBClear } from "../../../db/controllers.js";
import { log } from "../../../utils/log.js";
import * as readlineSync from "readline-sync";
export function clearDB() {
  const confirm = readlineSync.question(
    `Are you sure you want to clear the Envshh Database? (y/N): `
  );
  if (confirm === "y") {
    log.info(`Envshh Database Cleared.`);
    DBClear();
  }
}
