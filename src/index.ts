#! /usr/bin/env node

// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "commander";
import * as readlineSync from "readline-sync";
import figlet from "figlet";
import { syncDB } from "./envshh/commands/db/sync.js";
import { clearDB } from "./envshh/commands/db/clear.js";
import {
  defaultBranchName,
  defaultInstanceName,
} from "./envshh/defaults/defaults.js";
import { resetInstance } from "./envshh/commands/instance/reset.js";
import { removeInstance } from "./envshh/commands/instance/remove.js";
import { isDirectoryAGitRepository } from "./git/checks.js";
import { getGitRepoName } from "./git/functions.js";
import { getCurrentWorkingDirectoryName } from "./filesystem/functions.js";
import { thePush } from "./envshh/commands/push.js";
import { thePull } from "./envshh/commands/pull.js";
import { log } from "./utils/log.js";

const program = new Command();
program
  .name("envshh")
  .addHelpText("beforeAll", figlet.textSync("envshh"))
  .description(
    "A command line tool to securely and automatically manage, store environment variables.\
    \nMade by Sanjib Sen <mail@sanjibsen.com> \nGitHub: https://github.com/sanjib-sen/envshh",
  )
  .version(
    process.env.npm_package_version ? process.env.npm_package_version : "1.00",
    "-v, --version",
  );

program
  .command("push")
  .description("Push local environment variables to Upstream")
  .option(
    "-p, --project <project-name>",
    "Select a project name. Defaults to GitHub Repo Name or Current Directory Name.",
    isDirectoryAGitRepository(process.cwd())
      ? getGitRepoName(process.cwd())
      : getCurrentWorkingDirectoryName(),
  )
  .option(
    "-b, --branch <name>",
    `Keep different branches for different production, development and staging. Defaults to '${defaultBranchName}'.`,
    defaultBranchName,
  )
  .option(
    "-e, --env <relative-path-to-folders/file where the .env/.envs are located.>",
    "Specify input directory or file location. Defaults to current directory.",
    process.cwd(),
  )
  .option("--offline", "Don't push to remote repository. Just commit locally.")
  .option(
    "-i, --instance <Instance name.>",
    `[Advanced Option] Specify the instance name. Defaults to '${defaultInstanceName}'.`,
    defaultInstanceName,
  )
  .action((options) => {
    const password = readlineSync.question("Password: ", {
      hideEchoBack: true,
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

program
  .command("pull")
  .description("Pull environment variables from Upstream")
  .option(
    "-p, --project <project-name>",
    "Select a project name. Defaults to GitHub Repo Name or Current Directory Name.",
    isDirectoryAGitRepository(process.cwd())
      ? getGitRepoName(process.cwd())
      : getCurrentWorkingDirectoryName(),
  )
  .option(
    "-b, --branch <name>",
    `Keep different branches for different production, development and staging. Defaults to '${defaultBranchName}'.`,
    defaultBranchName,
  )
  .option(
    "--offline",
    "Don't pull from remote repository. Just do an offline pull. Default: false.",
    false,
  )
  .option(
    "-i, --instance <Instance name.>",
    `[Advanced Option] Specify the instance name. Defaults to '${defaultInstanceName}'.`,
    defaultInstanceName,
  )
  .action((options) => {
    log.info(`${options.project} ${options.branch}`);
    const password = readlineSync.question("Password: ", {
      hideEchoBack: true,
    });
    thePull({
      password: password,
      name: options.project,
      branch: options.branch,
      offline: options.offline,
      instance: options.instance,
    });
  });

program
  .command("db")
  .description("[Advanced] Manage instance database")
  .command("sync")
  .description(
    "[Advanced] Remove all deleted or moved instances from database.",
  )
  .action(() => {
    syncDB();
  })
  .command("clear")
  .description("[Advanced][Careful] Remove all instances from Database")
  .action(() => {
    clearDB();
  });

program
  .command("instance")
  .description("[Advanced] Manage Instances")
  .command("create")
  .description(
    "[Advanced] Create an instance. Use this command to create a new instance in interactive mode.",
  )
  .option(
    "-n, --name <name>",
    `Specify the instance name. Defaults to '${defaultInstanceName}'.`,
    defaultInstanceName,
  )
  .option(
    "-d, --directory <directory>",
    "[Advanced] Specify the directory path for the instance.",
  )
  .option("-r, --remote <remote-url>", "Specify the Remote Repository URL.")
  .command("edit")
  .description("[Advanced] Modify an instance.")
  .option(
    "-n, --name <name>",
    `Specify the instance name. Defaults to '${defaultInstanceName}'.`,
    defaultInstanceName,
  )
  .option("--new-name <new-ame>", "Specify the new name for the instance.")
  .option(
    "--directory <directory-path>",
    "Modify the directory path for the instance.",
  )
  .option("--remote <remote-url>", "Modify the Remote Repository URL.")
  .action(() => {
    syncDB();
  })
  .command("remove")
  .description("[Advanced][Careful] Delete the instance data.")
  .option(
    "-n, --name <name>",
    `Specify the instance name. Defaults to '${defaultInstanceName}'.`,
    defaultInstanceName,
  )
  .action((options) => {
    removeInstance(options.name);
  })
  .command("reset")
  .description("[Advanced][Careful] Reset the instance.")
  .option(
    "-n, --name <name>",
    `Specify the instance name. Defaults to '${defaultInstanceName}'.`,
    defaultInstanceName,
  )
  .action((options) => {
    resetInstance(options.name);
  });

program.parse();
