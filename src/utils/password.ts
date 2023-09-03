// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as readlineSync from "readline-sync";
import { log } from "./log.js";

export function askPassword(confirm = true) {
  log.flow("Prompting for password to encrypt/decrypt the file/string");
  if (!confirm) {
    return readlineSync.question("Password: ", {
      hideEchoBack: true,
    });
  }
  return readlineSync.questionNewPassword("Password: ", {
    confirmMessage: "Confirm Password: ",
    min: 4,
    max: 64,
  });
}
