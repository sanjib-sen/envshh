// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createFile } from "../../filesystem/functions.js";
import {
  getCleanValueFromLine,
  getQuotedValueFromLine,
  getQuteFromValue,
  readEnvByLine,
} from "./common.js";
import { encryptString } from "./lib.js";

function getEncryptedValueFromLine(line: string, password: string) {
  const quotedValue = getQuotedValueFromLine(line);
  const originalValue = getCleanValueFromLine(line);
  const encryptedValue = encryptString(originalValue, password);
  const quote = getQuteFromValue(quotedValue);
  return quote ? `${quote}${encryptedValue}${quote}` : encryptedValue;
}

export function getEncryptedEnv(location: string, password: string) {
  let encryptedEnv = "";
  const lines = readEnvByLine(location);
  const encryptedLines = [];
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim();
    if (line === "" || line.startsWith("#") || line === "\n") {
      encryptedLines.push(line);
      continue;
    }
    const key = line.substring(0, line.indexOf("=")).trim();
    const value = getEncryptedValueFromLine(line, password);
    encryptedLines.push(`${key}=${value}`);
  }
  encryptedEnv += encryptedLines.join("\n");
  return encryptedEnv;
}

export function saveEncryptedEnv(
  envPath: string,
  password: string,
  destination: string
) {
  const encryptedEnv = getEncryptedEnv(envPath, password);

  createFile(destination, encryptedEnv);
}
