// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  isDirectoryExists,
  isGitInstalledAndPathed,
  isRepositoryExistsOnUpstream,
} from "./checks.js";
import { log } from "./log.js";
import { createDirectory } from "./filesystem/functions.js";
import { EnvshhConfigSchema, EnvshhConfigType } from "./types/schemas.js";
import { EnvshhConfigParamsType } from "./types/params.js";
import z from "zod";
import { defaultMainDirectory } from "./defaults/defaults.js";
import { insertInstance } from "./db/controllers.js";

export class EnvshhInstance {
  config: EnvshhConfigType;
  constructor(EnvshhConfigParams?: EnvshhConfigParamsType) {
    try {
      const parsedData = EnvshhConfigSchema.parse(EnvshhConfigParams);
      this.config = parsedData;
    } catch (err) {
      if (err instanceof z.ZodError) {
        log.error(err.issues.map((issue) => issue.message).join("\n"));
      }
      process.exit(1);
    }
    this.initChecks(this.config);
    this.createMasterRepo();
  }
  private initChecks(EnvshhConfig?: EnvshhConfigType) {
    if (isGitInstalledAndPathed()) {
      log.success("Git is installed and in path");
    } else {
      log.error("Git is not installed or not in path");
      process.exit(1);
    }
    if (
      EnvshhConfig?.mainDirectory &&
      !isDirectoryExists(EnvshhConfig?.mainDirectory)
    ) {
      log.error(
        `Specified Directory ${EnvshhConfig?.mainDirectory} does not exist`,
      );
      process.exit(1);
    } else if (!EnvshhConfig?.mainDirectory) {
      log.info(
        `Did not specify any Master Directory. Using default: ${defaultMainDirectory}`,
      );
    } else if (
      EnvshhConfig?.mainDirectory &&
      isDirectoryExists(EnvshhConfig?.mainDirectory)
    ) {
      log.success(`Using Master Directory: ${this.config.mainDirectory}`);
    }

    if (!this.config.mainRepoUrl) {
      log.warn(
        "Did not specify any Master Repository URL. Online sync will not work.",
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
        `Specified Repository URL ${this.config.mainRepoUrl} does not exist`,
      );
      process.exit(1);
    }
  }
  private createMasterRepo() {
    createDirectory(this.config.mainDirectory);
  }
  ismainRepoUrlSet() {
    return this.config.mainRepoUrl ? true : false;
  }
  getmainRepoUrl() {
    return this.config.mainRepoUrl;
  }
  getmainDirectory() {
    return this.config.mainDirectory;
  }
  setmainRepoUrl(mainRepoUrl: string) {
    this.config.mainRepoUrl = mainRepoUrl;
  }
  setmainDirectory(mainDirectory: string) {
    this.config.mainDirectory = mainDirectory;
  }
}

export const envshh = new EnvshhInstance({
  name: "envshh",
});

insertInstance(envshh.config);

// log.info(envshh.config.name);
