// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { EnvshhInstanceType } from "../../../types/schemas.js";
import * as readlineSync from "readline-sync";
import { EnvshhInstance } from "../../envshh.js";

export function createInstance(
  envshhCreateParams: EnvshhInstanceType | undefined
) {
  const name =
    envshhCreateParams?.name || readlineSync.question("Instance Name: ");
  const mainDirectory =
    envshhCreateParams?.mainDirectory ||
    readlineSync.question("Directory Path: ");
  const mainRepoUrl =
    envshhCreateParams?.mainRepoUrl ||
    readlineSync.question("Upstream Remote Repository URL: ");
  const envshh = new EnvshhInstance({
    name: name,
    mainDirectory: mainDirectory,
    mainRepoUrl: mainRepoUrl,
  });
  return envshh.create();
}
