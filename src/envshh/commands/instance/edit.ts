// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { EnvshhInstanceModifyParamsType } from "../../../types/params.js";
import { DBgetInstance } from "../../../db/controllers.js";
import { EnvshhInstanceNameType } from "../../../types/schemas.js";

export function editInstance(
  name: EnvshhInstanceNameType,
  envshhModifyParams: EnvshhInstanceModifyParamsType
) {
  const envshh = DBgetInstance(name);
  return envshh.edit(envshhModifyParams);
}
