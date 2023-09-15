// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { readEnvByLine } from '../../envshh/functions/common.js';
import { getAllEnvsFromEnvPath } from '../../envshh/functions/get.js';
import { createFile } from '../../filesystem/functions.js';
import { log } from '../../utils/log.js';
import { exitWithError } from '../../utils/process.js';

export function getExampleFileString(location: string, defaultValue: string) {
  let encryptedEnv = '';
  const lines = readEnvByLine(location);
  const encryptedLines = [];
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim();
    if (line === '' || line.startsWith('#') || line === '\n') {
      encryptedLines.push(line);
      continue;
    }
    const key = line.substring(0, line.indexOf('=')).trim();
    const value = defaultValue;
    encryptedLines.push(`${key}=${value}`);
  }
  encryptedEnv += encryptedLines.join('\n');
  return encryptedEnv;
}

export function saveExampleFile(
  envPath: string,
  destination: string,
  defaultValue: string,
) {
  const encryptedEnv = getExampleFileString(envPath, defaultValue);
  createFile(destination, encryptedEnv);
}

export function theGenerate({
  envPath,
  value,
  suffix,
}: {
  envPath: string[];
  value: string;
  suffix: string;
}) {
  const envPaths = getAllEnvsFromEnvPath(envPath);
  if (envPaths.length === 0) {
    exitWithError(
      'No .env found. Consider running envshh generate -e <.env-path>',
    );
  }
  for (let index = 0; index < envPaths.length; index++) {
    const envPath = envPaths[index];
    const destination = `${envPath}.${suffix}`;
    saveExampleFile(envPath, destination, value);
  }
  log.success('Example files generated.');
}
