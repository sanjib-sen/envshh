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
import { EnvshhInstanceModifyParamsType } from "../types/params.js";
import { isPathExists } from "../filesystem/checks.js";
import { exitWithError } from "../utils/process.js";
import {
  defaultInstanceName,
  defaultMainDirectory,
} from "../envshh/defaults/defaults.js";
import path from "path";
import * as readlineSync from "readline-sync";

export function DBinsertInstance(envshhConfig: EnvshhInstanceType) {
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
  return new EnvshhInstance(db.data.instances[db.data.instances.length - 1]);
}

export function handleDefaultInstanceForPushNPull(
  name: EnvshhInstanceNameType,
) {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === name,
  );
  if (InstanceIndex === -1) {
    if (name === defaultInstanceName) {
      const repoUrl = readlineSync.question("Remote Repository URL: ");
      const envshh = new EnvshhInstance({
        name: defaultInstanceName,
        mainRepoUrl: repoUrl,
        mainDirectory: path.join(defaultMainDirectory, defaultInstanceName),
      });
      envshh.create();
      return envshh;
    } else {
      return exitWithError(
        `Instance ${name} not found. Create one by running: envshh instance create`,
      );
    }
  } else {
    return DBgetInstance(name);
  }
}

export function DBgetInstance(name: EnvshhInstanceNameType) {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === name,
  );
  if (InstanceIndex === -1) {
    return exitWithError(
      `Instance ${name} not found. Create one by running: envshh instance create`,
    );
  }
  return new EnvshhInstance(db.data.instances[InstanceIndex]);
}

export function DBshow(instanceName?: EnvshhInstanceNameType) {
  if (instanceName) {
    const envshh = DBgetInstance(instanceName);
    envshh.print();
  } else {
    db.read();
    console.table(db.data.instances);
  }
}

export function DBeditInstance(envshh: EnvshhInstanceModifyParamsType) {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === envshh.name,
  );
  if (InstanceIndex === -1) {
    return exitWithError(`Instance ${envshh.name} not found.`);
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
    (instance) => instance.name === name,
  );
  if (InstanceIndex === -1) {
    return exitWithError("Instance not found.");
  }
  db.data.instances.splice(InstanceIndex, 1);
  db.write();
}

export function DBSync() {
  db.read();
  db.data.instances.forEach((instance) => {
    if (!isPathExists(instance.mainDirectory)) {
      DBdeleteInstance(instance.name);
    }
  });
  db.write();
}

export function DBClear() {
  db.read();
  db.data.instances = [];
  db.write();
}
