// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DBgetInstance } from "../../../db/controllers.js";
import { EnvshhInstanceNameType } from "../../../types/schemas.js";
import * as readlineSync from "readline-sync";

export function resetInstance(name: EnvshhInstanceNameType, yes: boolean) {
  const envshh = DBgetInstance(name);
  if (yes) {
    return envshh.reset();
  }
  const confirm = readlineSync.question(
    `Are you sure you want to clear ${name}? (y/N): `,
  );
  if (confirm === "y") {
    return envshh.reset();
  }
}
