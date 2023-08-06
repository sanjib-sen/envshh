// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { db } from "./db.js";
import { EnvshhConfigType } from "../types/schemas.js";

export function insertInstance(envshhConfig: EnvshhConfigType) {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === envshhConfig.name,
  );
  if (InstanceIndex === -1) {
    db.data.instances.push(envshhConfig);
  } else {
    db.data.instances[InstanceIndex] = envshhConfig;
  }
  db.write();
}

export function getInstance(name: string): EnvshhConfigType | null {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === name,
  );
  if (InstanceIndex === -1) {
    return null;
  }
  return db.data.instances[InstanceIndex];
}
