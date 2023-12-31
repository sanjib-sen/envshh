// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { encryptString } from '../../encryption/lib.js';
import { isPathExists } from '../../filesystem/checks.js';
import { createFile, readFile } from '../../filesystem/functions.js';
import { log } from '../../utils/log.js';
import { exitWithWarning } from '../../utils/process.js';
import {
  getCleanValueFromLine,
  getQuotedValueFromLine,
  getQuteFromValue,
  readEnvByLine,
} from './common.js';
import { getDecryptedEnv } from './decrypt.js';

function getEncryptedValueFromLine(line: string, password: string) {
  const quotedValue = getQuotedValueFromLine(line);
  const originalValue = getCleanValueFromLine(line);
  const encryptedValue = encryptString(originalValue, password);
  const quote = getQuteFromValue(quotedValue);
  return quote ? `${quote}${encryptedValue}${quote}` : encryptedValue;
}

export function getEncryptedEnv(location: string, password: string) {
  log.flow(`Encrypting the ${location} file}`);
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
    const value = getEncryptedValueFromLine(line, password);
    encryptedLines.push(`${key}=${value}`);
  }
  encryptedEnv += encryptedLines.join('\n');
  return encryptedEnv;
}

export function saveEncryptedEnv(
  envPath: string,
  password: string,
  destination: string,
) {
  log.flow(`Encrypting the ${envPath} file and saving to ${destination}`);
  const encryptedEnv = getEncryptedEnv(envPath, password);

  if (isPathExists(destination)) {
    const decryptedEnv = getDecryptedEnv(destination, password);
    if (decryptedEnv === readFile(envPath)) {
      return exitWithWarning(`No changes detected. Skipping ${envPath}`);
    }
  }
  createFile(destination, encryptedEnv);
}
