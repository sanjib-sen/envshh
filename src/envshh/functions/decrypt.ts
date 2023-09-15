// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { decryptString } from '../../encryption/lib.js';
import { createFile } from '../../filesystem/functions.js';
import { log } from '../../utils/log.js';
import {
  getCleanValueFromLine,
  getQuotedValueFromLine,
  getQuteFromValue,
  readEnvByLine,
} from './common.js';

function getDecryptedValueFromLine(line: string, password: string) {
  const quotedValue = getQuotedValueFromLine(line);
  const encryptedValue = getCleanValueFromLine(line);
  const originalValue = decryptString(encryptedValue, password);
  const quote = getQuteFromValue(quotedValue);
  return quote ? `${quote}${originalValue}${quote}` : originalValue;
}

export function getDecryptedEnv(location: string, password: string) {
  log.flow(`Decrypting the ${location} file}`);
  let decryptedEnv = '';
  const lines = readEnvByLine(location);
  const decryptedLines = [];
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (line === '' || line.startsWith('#') || line === '\n') {
      decryptedLines.push(line);
      continue;
    }
    const key = line.substring(0, line.indexOf('=')).trim();
    const value = getDecryptedValueFromLine(line, password);
    decryptedLines.push(`${key}=${value}`);
  }
  decryptedEnv += decryptedLines.join('\n');
  return decryptedEnv;
}

export function saveDecryptedEnv(
  envPath: string,
  password: string,
  destination: string,
) {
  log.flow(`Decrypting the ${envPath} file and saving to ${destination}`);
  const decryptedEnv = getDecryptedEnv(envPath, password);
  createFile(destination, decryptedEnv);
}
