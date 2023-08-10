// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as readlineSync from "readline-sync";
import { DBgetInstance } from "../../../db/controllers.js";
import { log } from "../../../utils/log.js";
import { EnvshhInstanceNameType } from "../../../types/schemas.js";

export function removeInstance(name: EnvshhInstanceNameType) {
  const envshh = DBgetInstance(name);
  const confirm = readlineSync.question(
    `Are you sure you want to delete ${name}? (y/N): `
  );
  if (confirm === "y") {
    log.info(`Instance ${name} deleted.`);
    return envshh.remove();
  } else {
    log.info(`Instance ${name} not deleted.`);
    return envshh;
  }
}
