// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getConfigs } from "../../db/db.js";
import { getCurrentWorkingDirectoryName } from "../../filesystem/functions.js";
import { isDirectoryAGitRepository } from "../../git/checks.js";
import { getGitRepoName } from "../../git/functions.js";

export const defaultLocalDirectory = getConfigs().localDirectory;

export const defaultProjectName = isDirectoryAGitRepository(process.cwd())
  ? getGitRepoName(process.cwd()) ?? getCurrentWorkingDirectoryName()
  : getCurrentWorkingDirectoryName();

export const envExtensions = getConfigs().envPatterns;

export const envQuotations = getConfigs().envValueQuotations;

export const excludedFiles = getConfigs().ignoreFiles;

export const defaultBranchNamePrefix = getConfigs().branchNamePrefix;

export const defaultInstanceName = getConfigs().instanceName;

export const defaultBranchName = getConfigs().branchName;
