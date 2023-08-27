// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { EnvshhInstanceType } from "../types/schemas.js";
import { defaultDBPath } from "../envshh/defaults/defaults.js";
import { createFile } from "../filesystem/functions.js";
import { isPathExists } from "../filesystem/checks.js";

const jsonDefaultData = {
  instances: [],
};
if (!isPathExists(defaultDBPath)) {
  createFile(defaultDBPath, JSON.stringify(jsonDefaultData));
}
const adapter = new JSONFileSync<{ instances: EnvshhInstanceType[] }>(
  defaultDBPath,
);
const defaultData = {
  instances: [],
};
export const db = new LowSync(adapter, defaultData);
