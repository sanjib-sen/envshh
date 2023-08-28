// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { EnvshhInstanceType } from "../../../types/schemas.js";
import * as readlineSync from "readline-sync";
import { EnvshhInstance } from "../../envshh.js";
import { exitWithError } from "../../../utils/process.js";
import { defaultInstanceName } from "../../defaults/defaults.js";
import { DBCheckInstanceExists } from "../../../db/controllers.js";

export function createInstance(
  envshhCreateParams: Partial<EnvshhInstanceType>,
  yes: boolean,
) {
  const name =
    envshhCreateParams?.name ||
    readlineSync.question(
      `Instance Name (Default: ${defaultInstanceName}): `,
    ) ||
    defaultInstanceName;
  if (DBCheckInstanceExists(name) && !yes)
    return exitWithError(`Instance ${name} already exists.`);
  const localDirectory =
    envshhCreateParams?.localDirectory ||
    readlineSync.question("Directory Path: ");
  if (!localDirectory)
    return exitWithError(
      `Instance ${name} not created. Directory Path is required.`,
    );
  const remoteRepoUrl =
    envshhCreateParams?.remoteRepoUrl ||
    readlineSync.question(
      "Remote Repository URL (Keep this blank if you want to use offline): ",
    ) ||
    undefined;
  const envshh = new EnvshhInstance({
    name: name,
    localDirectory: localDirectory,
    remoteRepoUrl: remoteRepoUrl,
  });
  const newEnvshh = envshh.create();
  return newEnvshh.print();
}
