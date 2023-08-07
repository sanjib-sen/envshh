// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  isGitInstalledAndPathed,
  isRepositoryExistsOnUpstream,
} from "../git/checks.js";
import { isPathExists } from "../filesystem/checks.js";
import { log } from "../utils/log.js";
import {
  createDirectory,
  deleteDirectoryOrFile,
} from "../filesystem/functions.js";
import { EnvshhInstanceSchema, EnvshhInstanceType } from "../types/schemas.js";
import z from "zod";
import { defaultMainDirectory } from "./defaults/defaults.js";
import { insertInstance, deleteInstance } from "../db/controllers.js";
import { commitRepo, pullRepo, pushRepo } from "../git/functions.js";

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
    this.createMainDirectory();
    insertInstance(this.config);
  }
  private initChecks() {
    if (isGitInstalledAndPathed()) {
      log.success("Git is installed and in path");
    } else {
      log.error("Git is not installed or not in path");
      process.exit(1);
    }
    if (this.config.mainDirectory && !isPathExists(this.config.mainDirectory)) {
      log.error(
        `Specified Directory ${this.config.mainDirectory} does not exist`
      );
      process.exit(1);
    } else if (!this.config.mainDirectory) {
      log.info(
        `Did not specify any Master Directory. Using default: ${defaultMainDirectory}`
      );
    } else if (
      this.config.mainDirectory &&
      isPathExists(this.config.mainDirectory)
    ) {
      log.success(`Using Master Directory: ${this.config.mainDirectory}`);
    }

    if (!this.config.mainRepoUrl) {
      log.warn(
        "Did not specify any Master Repository URL. Online sync will not work."
      );
    } else if (
      this.config.mainRepoUrl &&
      isRepositoryExistsOnUpstream(this.config.mainRepoUrl)
    ) {
      log.success(`Using Master Repository URL: ${this.config.mainRepoUrl}`);
    } else if (
      this.config.mainRepoUrl &&
      !isRepositoryExistsOnUpstream(this.config.mainRepoUrl)
    ) {
      log.error(
        `Specified Repository URL ${this.config.mainRepoUrl} does not exist`
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

  remove() {
    this.deleteMainDirectory();
    deleteInstance(this.config.name);
  }

  reset() {
    this.deleteMainDirectory();
    this.createMainDirectory();
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

export const envshh = new EnvshhInstance({
  name: "envshh",
  mainDirectory: defaultMainDirectory,
});

insertInstance(envshh.config);

// log.info(envshh.config.name);
