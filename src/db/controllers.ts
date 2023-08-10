// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { db } from "./db.js";
import {
  EnvshhInstanceNameType,
  EnvshhInstanceType,
} from "../types/schemas.js";
import { EnvshhInstance } from "../envshh/envshh.js";
import { log } from "../utils/log.js";
import { EnvshhInstanceModifyParamsType } from "../types/params.js";

export function DBinsertInstance(envshhConfig: EnvshhInstanceType) {
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

export function DBgetInstance(name: EnvshhInstanceNameType) {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === name
  );
  if (InstanceIndex === -1) {
    log.error(
      `Instance ${name} not found. Create one by running: envshh instance create`
    );
    process.exit(1);
  }
  return new EnvshhInstance(db.data.instances[InstanceIndex]);
}

export function DBeditInstance(envshh: EnvshhInstanceModifyParamsType) {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === envshh.name
  );
  if (InstanceIndex === -1) {
    log.error(`Instance ${name} not found.`);
    process.exit(1);
  }
  if (envshh.mainRepoUrl)
    db.data.instances[InstanceIndex].mainRepoUrl = envshh.mainRepoUrl;
  if (envshh.mainDirectory)
    db.data.instances[InstanceIndex].mainDirectory = envshh.mainDirectory;
  db.write();
  return new EnvshhInstance(db.data.instances[InstanceIndex]);
}

export function DBdeleteInstance(name: EnvshhInstanceNameType) {
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
