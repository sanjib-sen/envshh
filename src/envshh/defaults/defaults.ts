// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getConfigs } from "../../db/db.js";
import { getCurrentWorkingDirectoryName } from "../../filesystem/functions.js";
import { isDirectoryAGitRepository } from "../../git/checks.js";
import { getGitRepoName } from "../../git/functions.js";

export const defaultValidRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

export const defaultRegexNameConventionMessage = (type: string) => {
  return `${type} Name: Only letters, numbers, dash (-), underscore (_) are supported.
                      Name must start or end with a letter or number.
                      Name must be between 1 and 25 characters long.
                      Name cannot contain consecutive dash (-), underscore (_)
              `;
};

export const defaultLocalDirectory = getConfigs().localDirectory;

export const defaultProjectName = isDirectoryAGitRepository(process.cwd())
  ? getGitRepoName(process.cwd()) ?? getCurrentWorkingDirectoryName()
  : getCurrentWorkingDirectoryName();

export const envExtensions = [
  ".env",
  ".env.development",
  ".env.test",
  ".env.production",
  ".env.local",
  ".env.development.local",
  ".env.test.local",
  ".env.production.local",
];

export const envQuotations = getConfigs().envValueQuotations;

export const excludedFiles = getConfigs().ignoreFiles;

export const defaultBranchNamePrefix = getConfigs().branchNamePrefix;

export const defaultInstanceName = getConfigs().instanceName;

export const defaultBranchName = getConfigs().branchName;
