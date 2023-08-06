#! /usr/bin/env node

// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { envshh_pull, envshh_push } from "./init/checks";
import { version } from "../package.json";
import { Command } from "commander";
import * as readlineSync from "readline-sync";
import figlet from "figlet";

const program = new Command();
program
  .name("envshh")
  .addHelpText("beforeAll", figlet.textSync("envshh"))
  .description(
    "A command line tool to securely and automatically manage, store environment variables.\
    \nMade by Sanjib Sen <mail@sanjibsen.com> \nGitHub: https://github.com/sanjib-sen/envshh",
  )
  .version(version, "-v, --version");

program
  .command("push")
  .description("Push local environment variables to Upstream")
  .option(
    "-p, --project <project-name>",
    "Select a project name. Defaults to GitHub Repo Name or Current Directory Name.",
  )
  .option(
    "-d, --directory <relative-path-to-directory>",
    "Directory where env files are located.",
  )
  .option("-f, --file <relative-path-to-file>", "Select the .env file")
  .option(
    "-b, --branch <name>",
    "Keep different branches for different production, development and staging. Defaults to 'main'.",
  )
  .option("--offline", "Don't push to remote repository. Just commit locally.")
  .action((options) => {
    const password = readlineSync.question("Password: ", {
      hideEchoBack: true,
    });
    envshh_push(
      password,
      options.project,
      options.directory,
      options.file,
      options.branch,
      options.offline,
    );
  });

program
  .command("pull")
  .description("Pull environment variables from Upstream")
  .option(
    "-p, --project <project-name>",
    "Select a project name. Defaults to GitHub Repo Name or Current Directory Name.",
  )
  .option(
    "-b, --branch <name>",
    "Keep different branches for different production, development and staging. Defaults to 'main'.",
  )
  .option("--offline", "Don't push to remote repository. Just commit locally.")
  .action((options) => {
    const password = readlineSync.question("Password: ", {
      hideEchoBack: true,
    });
    envshh_pull(password, options.project, options.branch, options.offline);
  });

program.parse();
