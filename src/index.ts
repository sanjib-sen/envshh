// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  cloneMasterRepo,
  createMasterRepo,
  // envshh_pull,
  // envshh_push,
  isGitInstalledAndPathed,
  isInDebugMode,
  isMasterRepoExists,
  isMasterRepoIsGit,
} from "./init/checks";

if (isInDebugMode()) {
  process.stdout.write("Checking if git is installed and added to Path... ");
}
if (isGitInstalledAndPathed()) {
  if (isInDebugMode()) {
    process.stdout.write("OK\n");
  }
} else {
  if (isInDebugMode()) {
    process.stdout.write("Failed\n");
  }
  process.stdout.write("Error: Git is not installed or not added to Path.\n");
  process.exit(1);
}

if (!isMasterRepoExists() || !isMasterRepoIsGit()) {
  createMasterRepo();
  cloneMasterRepo("https://github.com/sanjib-sen/sanjib-sen");
}

// envshh_push("123");
// envshh_pull("123");
