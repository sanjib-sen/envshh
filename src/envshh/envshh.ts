// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  isGitInstalledAndPathed,
  isRepositoryExistsOnRemote,
} from "../git/checks.js";
import {
  copyFileAndFolder,
  createDirectory,
  deleteDirectoryOrFile,
} from "../filesystem/functions.js";
import { EnvshhInstanceSchema, EnvshhInstanceType } from "../types/schemas.js";
import z from "zod";
import { DBdeleteInstance, DBinsertInstance } from "../db/controllers.js";
import {
  cloneRepo,
  commitRepo,
  initRepo,
  pullRepo,
  pushRepo,
} from "../git/functions.js";
import { isDirectoryEmpty } from "../filesystem/checks.js";
import { exitWithError } from "../utils/process.js";
import { handleError } from "../utils/error.js";

export class EnvshhInstance {
  config: EnvshhInstanceType;
  constructor(EnvshhConfigParams?: EnvshhInstanceType) {
    try {
      const parsedData = EnvshhInstanceSchema.parse(EnvshhConfigParams);
      this.config = parsedData;
    } catch (err) {
      if (err instanceof z.ZodError) {
        exitWithError(err.issues.map((issue) => issue.message).join("\n"));
      }
      handleError(err);
      process.exit(1);
    }
  }
  private initChecks() {
    if (!isGitInstalledAndPathed()) {
      return exitWithError("Git is not installed or not in path");
    }
    if (
      this.config.remoteRepoUrl &&
      !isRepositoryExistsOnRemote(this.config.remoteRepoUrl)
    ) {
      return exitWithError(
        `Specified Repository URL ${this.config.remoteRepoUrl} does not exist`,
      );
    }
  }
  private createLocalDirectory() {
    createDirectory(this.config.localDirectory);
  }

  private deleteLocalDirectory() {
    deleteDirectoryOrFile(this.config.localDirectory);
  }

  create() {
    this.initChecks();
    DBinsertInstance(this.config);
    this.createLocalDirectory();
    this.isRemoteRepoUrlSet() ? cloneRepo(this.config) : initRepo(this.config);
    return this;
  }

  edit(envshh: Partial<EnvshhInstanceType>) {
    const newEnvshhInstance = new EnvshhInstance({
      name: envshh.name || this.config.name,
      localDirectory: envshh.localDirectory || this.config.localDirectory,
      remoteRepoUrl: envshh.remoteRepoUrl || this.config.remoteRepoUrl,
    });
    newEnvshhInstance.initChecks();
    if (
      newEnvshhInstance.config.localDirectory !== this.config.localDirectory
    ) {
      newEnvshhInstance.createLocalDirectory();
      if (!isDirectoryEmpty(this.config.localDirectory)) {
        copyFileAndFolder(
          this.config.localDirectory,
          newEnvshhInstance.config.localDirectory,
        );
      }
      this.deleteLocalDirectory();
    }
    newEnvshhInstance.create();
    DBdeleteInstance(this.config.name);
    return newEnvshhInstance;
  }

  remove() {
    this.deleteLocalDirectory();
    DBdeleteInstance(this.config.name);
    return this;
  }

  print() {
    console.table([this.config]);
  }

  reset() {
    this.deleteLocalDirectory();
    this.createLocalDirectory();
    return this;
  }

  gitPull() {
    if (!this.isRemoteRepoUrlSet()) {
      return;
    }
    pullRepo(this.config);
  }

  gitCommit() {
    commitRepo(this.config);
  }

  gitPush() {
    if (!this.isRemoteRepoUrlSet()) {
      return;
    }
    pushRepo(this.config);
  }

  isRemoteRepoUrlSet() {
    return this.config.remoteRepoUrl ? true : false;
  }
  getRemoteRepoUrl() {
    return this.config.remoteRepoUrl;
  }
  getLocalDirectory() {
    return this.config.localDirectory;
  }
  getName() {
    return this.config.name;
  }
  setRemoteRepoUrl(remoteRepoUrl: string | undefined) {
    this.config.remoteRepoUrl = remoteRepoUrl;
  }
  setLocalDirectory(localDirectory: string) {
    this.config.localDirectory = localDirectory;
  }
}
