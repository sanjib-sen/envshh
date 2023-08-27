// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DBClear } from "../../../db/controllers.js";
import * as readlineSync from "readline-sync";
export function clearDB(yes: boolean) {
  if (yes) {
    return DBClear();
  }
  const confirm = readlineSync.question(
    `Are you sure you want to clear the Envshh Database? This will remove all data from remote repository too. (y/N): `,
  );
  if (confirm === "y") {
    return DBClear();
  }
}
