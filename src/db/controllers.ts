// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { db } from "./db.js";
import { EnvshhInstanceType } from "../types/schemas.js";
import { EnvshhInstance } from "../envshh/envshh.js";
import { log } from "../utils/log.js";

export function insertInstance(envshhConfig: EnvshhInstanceType) {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === envshhConfig.name
  );
  if (InstanceIndex === -1) {
    db.data.instances.push(envshhConfig);
  } else {
    db.data.instances[InstanceIndex] = envshhConfig;
  }
  db.write();
}

export function getInstance(name: string) {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === name
  );
  if (InstanceIndex === -1) {
    log.error("Instance not found.");
    process.exit(1);
  }
  return new EnvshhInstance(db.data.instances[InstanceIndex]);
}

export function deleteInstance(name: string) {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === name
  );
  if (InstanceIndex === -1) {
    log.error("Instance not found.");
    process.exit(1);
  }
  db.data.instances.splice(InstanceIndex, 1);
  db.write();
}
