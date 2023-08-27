// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as readlineSync from "readline-sync";
import { DBgetInstance } from "../../../db/controllers.js";
import { EnvshhInstanceNameType } from "../../../types/schemas.js";

export function removeInstance(name: EnvshhInstanceNameType, yes: boolean) {
  const envshh = DBgetInstance(name);
  if (yes) {
    return envshh.remove();
  }
  const confirm = readlineSync.question(
    `Are you sure you want to delete ${name}? (y/N): `,
  );
  if (confirm === "y") {
    envshh.remove();
    return envshh.remove();
  }
}
