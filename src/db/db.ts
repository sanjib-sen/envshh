// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

import { createFile } from "../filesystem/functions.js";
import { isPathExists } from "../filesystem/checks.js";
import { EnvshhInstanceType } from "../types/schemas.js";

type defaultsDataType = {
  branchName: string;
  instanceName: string;
  envPatterns: string[];
  envValueQuotations: string[];
  localDirectory: string;
  ignoreFiles: string[];
  branchNamePrefix: string;
};

const jsonDefaultData = {
  defaults: {
    branchName: "main",
    instanceName: "personal",
    localDirectory:
      process.platform === "win32"
        ? `${process.env.USERPROFILE}\\.envshh`
        : `${process.env.HOME}/.config/.envshh`,
    envPatterns: [
      ".env",
      ".env.development",
      ".env.test",
      ".env.production",
      ".env.local",
      ".env.development.local",
      ".env.test.local",
      ".env.production.local",
    ],
    envValueQuotations: ["'", '"'],
    ignoreFiles: ["README.md", "Readme.md", ".gitignore"],
    branchNamePrefix: "envshh-branch-",
  },
  instances: [],
};

export const defaultDBPath =
  process.platform === "win32"
    ? `${process.env.USERPROFILE}\\.envshh\\config.json`
    : `${process.env.HOME}/.config/.envshh/config.json`;
if (!isPathExists(defaultDBPath)) {
  createFile(defaultDBPath, JSON.stringify(jsonDefaultData, null, 2));
}
const adapter = new JSONFileSync<{
  defaults: defaultsDataType;
  instances: EnvshhInstanceType[];
}>(defaultDBPath);
export const db = new LowSync(adapter, jsonDefaultData);

export function getConfigs() {
  db.read();
  return db.data.defaults;
}
