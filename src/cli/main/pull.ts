// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import { thePull } from "../../envshh/commands/pull.js";
import {
  defaultBranchName,
  defaultInstanceName,
} from "../../envshh/defaults/defaults.js";
import { getCurrentWorkingDirectoryName } from "../../filesystem/functions.js";
import { isDirectoryAGitRepository } from "../../git/checks.js";
import { getGitRepoName } from "../../git/functions.js";
import { askPassword } from "../../utils/password.js";

export const pullCommand = new Command();

pullCommand
  .name("pull")
  .description("Pull environment variables from Remote Repository")
  .option(
    "-p, --project <project-name>",
    "Select a project name. Defaults to GitHub Repo Name or Current Directory Name.",
    isDirectoryAGitRepository(process.cwd())
      ? getGitRepoName(process.cwd())
      : getCurrentWorkingDirectoryName(),
  )
  .option(
    "-b, --branch <name>",
    `Keep different branches for different production, development and staging`,
    defaultBranchName,
  )
  .option(
    "-i, --instance <Instance name.>",
    `[Advanced Option] Specify the instance name`,
    defaultInstanceName,
  )
  .option(
    "--offline",
    "Don't pull from remote repository. Just do an offline pull",
    false,
  )
  .action((options) => {
    const password = askPassword(false);
    thePull({
      password: password,
      name: options.project,
      branch: options.branch,
      offline: options.offline,
      instance: options.instance,
    });
  });
