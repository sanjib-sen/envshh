import { Option } from "@commander-js/extra-typings";
import {
  defaultProjectName,
  defaultBranchName,
  defaultInstanceName,
} from "../envshh/defaults/defaults.js";

export const projectNameOption = new Option(
  "-p, --project <project-name>",
  "Select a project name. Defaults to GitHub Repo Name or Current Directory Name.",
).default(defaultProjectName);
export const branchNameOption = new Option(
  "-b, --branch <name>",
  `Keep different branches for different production, development and staging`,
).default(defaultBranchName);

export const envPathOption = new Option(
  "-e, --env <relative-path...>",
  "Specify input directory or file where the .env/.envs is/are located. Defaults to current directory.",
).default([process.cwd()]);

export const instanceNameOption = new Option(
  "-i, --instance <Instance name.>",
  `[Advanced Option] Specify the instance name`,
).default(defaultInstanceName);

export const offlineOption = new Option(
  "--offline",
  "Don't delete from remote repository. Just commit locally.",
).default(false);

export const forceOption = new Option(
  "-y, --yes",
  "Force delete .envs without asking for confirmation",
).default(false);
