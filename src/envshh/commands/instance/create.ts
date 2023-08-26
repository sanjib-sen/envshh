// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { EnvshhInstanceType } from "../../../types/schemas.js";
import * as readlineSync from "readline-sync";
import { EnvshhInstance } from "../../envshh.js";
import { exitWithError } from "../../../utils/process.js";
import { defaultInstanceName } from "../../defaults/defaults.js";
import { log } from "../../../utils/log.js";

export function createInstance(
  envshhCreateParams: Partial<EnvshhInstanceType>,
) {
  const name =
    envshhCreateParams?.name ||
    readlineSync.question(
      `Instance Name (Default: ${defaultInstanceName}): `,
    ) ||
    defaultInstanceName;
  const mainDirectory =
    envshhCreateParams?.mainDirectory ||
    readlineSync.question("Directory Path: ");
  if (!mainDirectory) {
    return exitWithError(
      `Instance ${name} not created. Directory Path is required.`,
    );
  }
  const mainRepoUrl =
    envshhCreateParams?.mainRepoUrl ||
    readlineSync.question(
      "Remote Repository URL (Keep this blank if you want to use offline): ",
    ) ||
    undefined;
  const envshh = new EnvshhInstance({
    name: name,
    mainDirectory: mainDirectory,
    mainRepoUrl: mainRepoUrl,
  });
  const newEnvshh = envshh.create();
  log.info("Creating..............");
  return newEnvshh.print();
}
