// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

import { isPathExists } from '../filesystem/checks.js';
import { createFile } from '../filesystem/functions.js';
import { DBSchema, EnvshhInstanceType, configType } from '../types/schemas.js';
import { handleZodError } from '../utils/error.js';
import { log } from '../utils/log.js';

const jsonDefaultData = {
  defaults: {
    branchName: 'main',
    instanceName: 'personal',
    localDirectory:
      process.platform === 'win32'
        ? `${process.env.USERPROFILE}\\.envshh`
        : `${process.env.HOME}/.config/.envshh`,
    envPatterns: [
      '.env',
      '.env.development',
      '.env.test',
      '.env.production',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local',
    ],
    envValueQuotations: ["'", '"'],
    ignoreFiles: ['README.md', 'Readme.md', '.gitignore'],
    branchNamePrefix: 'envshh-branch-',
  },
  instances: [],
};

export const defaultDBPath =
  process.platform === 'win32'
    ? `${process.env.USERPROFILE}\\.envshh\\config.json`
    : `${process.env.HOME}/.config/.envshh/config.json`;
if (!isPathExists(defaultDBPath)) {
  log.flow(
    `No config file found. Creating default config file at ${defaultDBPath}`,
  );
  createFile(defaultDBPath, JSON.stringify(jsonDefaultData, null, 2));
}
const adapter = new JSONFileSync<{
  defaults: configType;
  instances: EnvshhInstanceType[];
}>(defaultDBPath);
export const db = new LowSync(adapter, jsonDefaultData);

db.read();
log.flow(
  `Verifying Configuration Files. \n${JSON.stringify(db.data.defaults)}`,
);
handleZodError(DBSchema, db.data, `Configuration File is not valid.`);
export function getConfigs() {
  return db.data.defaults;
}
