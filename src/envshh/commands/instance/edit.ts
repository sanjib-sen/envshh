// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DBgetInstance } from "../../../db/controllers.js";
import {
  EnvshhInstanceNameType,
  EnvshhInstanceType,
} from "../../../types/schemas.js";
import * as readlineSync from "readline-sync";
import { log } from "../../../utils/log.js";

export function editInstance(
  name: EnvshhInstanceNameType,
  envshhModifyParams: Partial<EnvshhInstanceType>
) {
  const envshh = DBgetInstance(name);
  if (
    !envshhModifyParams.name &&
    !envshhModifyParams.localDirectory &&
    !envshhModifyParams.remoteRepoUrl
  ) {
    log.info(
      `Interactive mode. Press Ctrl+C to exit. Leave fields empty to keep the current value.`
    );
    const newName =
      readlineSync.question(`Instance Name (Current: ${name}): `) ||
      envshh.config.name;
    const localDirectory =
      readlineSync.question(
        `Directory Path (Current: ${envshh.getLocalDirectory()}): `
      ) || envshh.config.localDirectory;
    const remoteRepoUrl =
      envshhModifyParams?.remoteRepoUrl ||
      readlineSync.question(
        `Remote Repository URL (Write "none" if you want to use offline. Current: ${
          envshh.getRemoteRepoUrl() ? envshh.config.remoteRepoUrl : "none"
        }): `
      ) ||
      envshh.config.remoteRepoUrl;
    envshhModifyParams = {
      name: newName,
      localDirectory: localDirectory,
      remoteRepoUrl: remoteRepoUrl === "none" ? undefined : remoteRepoUrl,
    };
  }

  const newEnvshh = envshh.edit(envshhModifyParams);
  return newEnvshh.print();
}
