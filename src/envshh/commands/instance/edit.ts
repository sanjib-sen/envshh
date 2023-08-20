// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DBgetInstance } from "../../../db/controllers.js";
import {
  EnvshhInstanceNameType,
  EnvshhInstanceType,
} from "../../../types/schemas.js";
import { exitWithSuccess } from "../../../utils/process.js";

export function editInstance(
  name: EnvshhInstanceNameType,
  envshhModifyParams: Partial<EnvshhInstanceType>,
) {
  const envshh = DBgetInstance(name);
  const newEnvshh = envshh.edit(envshhModifyParams);
  return exitWithSuccess(`Instance ${name} modified. Modified instance:\n
    ${JSON.stringify(newEnvshh, null, 2)}
  `);
}
