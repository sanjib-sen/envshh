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
import * as readlineSync from "readline-sync";
import { log } from "../../../utils/log.js";

export function editInstance(
  name: EnvshhInstanceNameType,
  envshhModifyParams: Partial<EnvshhInstanceType>,
) {
  const envshh = DBgetInstance(name);
  if (
    !envshhModifyParams.name &&
    !envshhModifyParams.mainDirectory &&
    !envshhModifyParams.mainRepoUrl
  ) {
    log.info(
      `Interactive mode. Press Ctrl+C to exit. Leave fields empty to keep the current value.`,
    );
    const newName =
      readlineSync.question(`Instance Name (Current: ${name}): `) ||
      envshh.config.name;
    const mainDirectory =
      readlineSync.question(
        `Directory Path (Current: ${envshh.getMainDirectory()}): `,
      ) || envshh.config.mainDirectory;
    const mainRepoUrl =
      envshhModifyParams?.mainRepoUrl ||
      readlineSync.question(
        `Remote Repository URL (Write "none" if you want to use offline. Current: ${
          envshh.getMainRepoUrl() ? envshh.config.mainRepoUrl : "none"
        }): `,
      ) ||
      envshh.config.mainRepoUrl;
    envshhModifyParams = {
      name: newName,
      mainDirectory: mainDirectory,
      mainRepoUrl: mainRepoUrl === "none" ? undefined : mainRepoUrl,
    };
  }

  const newEnvshh = envshh.edit(envshhModifyParams);
  return exitWithSuccess(`Instance ${name} modified. Modified instance:\n
    ${JSON.stringify(newEnvshh, null, 2)}
  `);
}
