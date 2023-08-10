// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  isGitInstalledAndPathed,
  isRepositoryExistsOnRemote,
} from "../git/checks.js";
import { log } from "../utils/log.js";
import {
  copyFileAndFolder,
  createDirectory,
  deleteDirectoryOrFile,
} from "../filesystem/functions.js";
import { EnvshhInstanceSchema, EnvshhInstanceType } from "../types/schemas.js";
import z from "zod";
import { DBdeleteInstance, DBinsertInstance } from "../db/controllers.js";
import { commitRepo, pullRepo, pushRepo } from "../git/functions.js";
import { isDirectoryEmpty } from "../filesystem/checks.js";

export class EnvshhInstance {
  config: EnvshhInstanceType;
  constructor(EnvshhConfigParams?: EnvshhInstanceType) {
    try {
      const parsedData = EnvshhInstanceSchema.parse(EnvshhConfigParams);
      this.config = parsedData;
    } catch (err) {
      if (err instanceof z.ZodError) {
        log.error(err.issues.map((issue) => issue.message).join("\n"));
      }
      process.exit(1);
    }
    this.initChecks();
  }
  private initChecks() {
    if (isGitInstalledAndPathed()) {
      log.success("Git is installed and in path");
    } else {
      log.error("Git is not installed or not in path");
      process.exit(1);
    }
    if (!this.config.mainRepoUrl) {
      log.warn(
        "Did not specify any Master Repository URL. Online sync will not work.",
      );
    } else if (
      this.config.mainRepoUrl &&
      isRepositoryExistsOnRemote(this.config.mainRepoUrl)
    ) {
      log.success(`Using Master Repository URL: ${this.config.mainRepoUrl}`);
    } else if (
      this.config.mainRepoUrl &&
      !isRepositoryExistsOnRemote(this.config.mainRepoUrl)
    ) {
      log.error(
        `Specified Repository URL ${this.config.mainRepoUrl} does not exist`,
      );
      process.exit(1);
    }
  }
  private createMainDirectory() {
    createDirectory(this.config.mainDirectory);
  }

  private deleteMainDirectory() {
    deleteDirectoryOrFile(this.config.mainDirectory);
  }

  create() {
    DBinsertInstance(this.config);
    return this;
  }

  edit(envshh: Partial<EnvshhInstanceType>) {
    const newEnvshhInstance = new EnvshhInstance({
      name: envshh.name || this.config.name,
      mainDirectory: envshh.mainDirectory || this.config.mainDirectory,
      mainRepoUrl: envshh.mainRepoUrl || this.config.mainRepoUrl,
    });
    if (newEnvshhInstance.config.mainDirectory !== this.config.mainDirectory) {
      newEnvshhInstance.createMainDirectory();
      if (!isDirectoryEmpty(this.config.mainDirectory)) {
        copyFileAndFolder(
          this.config.mainDirectory,
          newEnvshhInstance.config.mainDirectory,
        );
      }
      this.deleteMainDirectory();
    }
    DBdeleteInstance(this.config.name);
    newEnvshhInstance.create();
    return newEnvshhInstance;
  }

  remove() {
    this.deleteMainDirectory();
    DBdeleteInstance(this.config.name);
    return this;
  }

  reset() {
    this.deleteMainDirectory();
    this.createMainDirectory();
    return this;
  }

  gitPull() {
    pullRepo(this.config);
  }

  gitCommit() {
    commitRepo(this.config);
  }

  gitPush() {
    pushRepo(this.config);
  }

  isMainRepoUrlSet() {
    return this.config.mainRepoUrl ? true : false;
  }
  getMainRepoUrl() {
    return this.config.mainRepoUrl;
  }
  getMainDirectory() {
    return this.config.mainDirectory;
  }
  setMainRepoUrl(mainRepoUrl: string | undefined) {
    this.config.mainRepoUrl = mainRepoUrl;
  }
  setMainDirectory(mainDirectory: string) {
    this.config.mainDirectory = mainDirectory;
  }
}
