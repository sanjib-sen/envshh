// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as fs from "fs";
import { envQuotations } from "../defaults/defaults.js";

function readEnv(path: string) {
  const env = fs.readFileSync(path, "utf8");
  return env;
}

export function readEnvByLine(path: string) {
  const env = readEnv(path);
  return env.split(/\r?\n/);
}

export function getQuotedValueFromLine(line: string) {
  const value = line.substring(line.indexOf("=") + 1) as string;
  return value;
}

export function getQuteFromValue(value: string) {
  for (let index = 0; index < envQuotations.length; index++) {
    const quote = envQuotations[index];
    if (value.startsWith(quote) && value.endsWith(quote)) {
      return quote;
    }
  }
  return "";
}

export function getCleanValueFromLine(line: string) {
  const value = getQuotedValueFromLine(line);
  const quote = getQuteFromValue(value);
  return quote ? value.replaceAll(quote, "") : value;
}
