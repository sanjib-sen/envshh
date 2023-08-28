// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import {
  defaultBranchName,
  defaultInstanceName,
} from "../../envshh/defaults/defaults.js";
import { getCurrentWorkingDirectoryName } from "../../filesystem/functions.js";
import { isDirectoryAGitRepository } from "../../git/checks.js";
import { getGitRepoName } from "../../git/functions.js";
import { theRemove } from "../../envshh/commands/remove.js";
import * as readlineSync from "readline-sync";

export const removeCommand = new Command();

removeCommand
  .name("remove")
  .description("Delete .envs from local and upstream")
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
    "-e, --env <relative-path...>",
    "Specify input directory or file where the .env/.envs is/are located. Defaults to current directory.",
    [process.cwd()],
  )
  .option(
    "-i, --instance <Instance name.>",
    `[Advanced Option] Specify the instance name`,
    defaultInstanceName,
  )
  .option(
    "--offline",
    "Don't delete from remote repository. Just commit locally.",
    false,
  )
  .option(
    "-y, --yes",
    "Force delete .envs without asking for confirmation",
    false,
  )
  .action((options) => {
    if (!options.yes) {
      const confirm = readlineSync.question(
        "Are you sure you want to delete .envs from local and Remote Repository? (y/N): ",
      );
      if (confirm !== "y") {
        process.exit(0);
      }
    }
    theRemove({
      name: options.project,
      envPath: options.env,
      branch: options.branch,
      offline: options.offline,
      instance: options.instance,
    });
  });
