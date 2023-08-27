// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import * as readlineSync from "readline-sync";
import { thePush } from "../../envshh/commands/push.js";
import {
  defaultBranchName,
  defaultInstanceName,
} from "../../envshh/defaults/defaults.js";
import { getCurrentWorkingDirectoryName } from "../../filesystem/functions.js";
import { isDirectoryAGitRepository } from "../../git/checks.js";
import { getGitRepoName } from "../../git/functions.js";

export const pushCommand = new Command();

pushCommand
  .name("push")
  .description("Push local environment variables to Upstream")
  .option(
    "-p, --project <project-name>",
    "Select a project name. Defaults to GitHub Repo Name or Current Directory Name.",
    isDirectoryAGitRepository(process.cwd())
      ? getGitRepoName(process.cwd())
      : getCurrentWorkingDirectoryName()
  )
  .option(
    "-b, --branch <name>",
    `Keep different branches for different production, development and staging.`,
    defaultBranchName
  )
  .option(
    "-e, --env <relative-path>",
    "Specify input directory or file where the .env/.envs is/are located. Defaults to current directory.",
    process.cwd()
  )
  .option(
    "-i, --instance <Instance name.>",
    `[Advanced Option] Specify the instance name.`,
    defaultInstanceName
  )
  .option(
    "--offline",
    "Don't push to remote repository. Just commit locally.",
    false
  )
  .action((options) => {
    const password = readlineSync.questionNewPassword("Password: ", {
      confirmMessage: "Confirm Password: ",
    });

    thePush({
      password: password,
      name: options.project,
      envPath: options.env,
      branch: options.branch,
      offline: options.offline,
      instance: options.instance,
    });
  });
