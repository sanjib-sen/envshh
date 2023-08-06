// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Remember to set type: module in package.json or use .mjs extension

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { EnvshhConfigType } from "../types/schemas.js";
import { defaultDBPath } from "../defaults/defaults.js";

// db.json file path

// Configure lowdb to write data to JSON filevb
const adapter = new JSONFileSync<{ instances: EnvshhConfigType[] }>(
  defaultDBPath,
);
const defaultData = {
  instances: [],
};
export const db = new LowSync(adapter, defaultData);
