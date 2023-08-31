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
import { isPathExists } from "../filesystem/checks.js";
import { exitWithError } from "../utils/process.js";
import {
  defaultDBPath,
  defaultInstanceName,
  defaultLocalDirectory,
} from "../envshh/defaults/defaults.js";
import path from "path";
import * as readlineSync from "readline-sync";
import { deleteDirectoryOrFile } from "../filesystem/functions.js";
import { log } from "../utils/log.js";

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
      log.info(
        `.envs will be stored on a local directory (${defaultLocalDirectory}) and a Remote Git Repository created by you.
Enter the already created Repository URL or Create one and then provide the URL.
Although the .envs are encrypted, it is recommended to make the Remote Repository Private.
If you do not want to store the .envs in a remote repository, keep the URL blank.
`,
      );
      const repoUrl = readlineSync.question("Remote Repository URL: ");
      const envshh = new EnvshhInstance({
        name: defaultInstanceName,
        remoteRepoUrl: repoUrl,
        localDirectory: path.join(defaultLocalDirectory, defaultInstanceName),
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

export function DBeditInstance(
  instanceName: EnvshhInstanceNameType,
  newEnvshh: EnvshhInstance,
) {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === instanceName,
  );
  if (InstanceIndex === -1) {
    return exitWithError(`Instance ${instanceName} not found.`);
  }
  db.data.instances[InstanceIndex].name = newEnvshh.getName();
  db.data.instances[InstanceIndex].remoteRepoUrl = newEnvshh.getRemoteRepoUrl();
  db.data.instances[InstanceIndex].localDirectory =
    newEnvshh.getLocalDirectory();
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

export function DBCheckInstanceExists(name: EnvshhInstanceNameType) {
  db.read();
  const InstanceIndex = db.data.instances.findIndex(
    (instance) => instance.name === name,
  );
  if (InstanceIndex === -1) {
    return false;
  }
  return true;
}

export function DBSync() {
  db.read();
  db.data.instances.forEach((instance) => {
    if (!isPathExists(instance.localDirectory)) {
      DBdeleteInstance(instance.name);
    }
  });
  db.write();
}

export function DBClear() {
  db.read();
  db.data.instances.map((instance) => {
    const envshh = new EnvshhInstance(instance);
    envshh.remove();
  });
  db.write();
  deleteDirectoryOrFile(defaultDBPath);
  deleteDirectoryOrFile(defaultLocalDirectory);
}
