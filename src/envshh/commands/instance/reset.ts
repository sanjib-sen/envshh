// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DBgetInstance } from "../../../db/controllers.js";
import { EnvshhInstanceNameType } from "../../../types/schemas.js";
import * as readlineSync from "readline-sync";
import { exitWithSuccess } from "../../../utils/process.js";

export function resetInstance(name: EnvshhInstanceNameType) {
  const envshh = DBgetInstance(name);
  const confirm = readlineSync.question(
    `Are you sure you want to clear ${name}? (y/N): `,
  );
  if (confirm === "y") {
    envshh.reset();
    return exitWithSuccess(`Instance ${name} Cleared.`);
  } else {
    return exitWithSuccess(`Instance ${name} not Cleared.`);
  }
}
