// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import * as readlineSync from "readline-sync";

export function askPassword(confirm = true) {
  if (!confirm) {
    return readlineSync.questionNewPassword("Password: ", {
      min: 4,
    });
  }
  return readlineSync.questionNewPassword("Password: ", {
    confirmMessage: "Confirm Password: ",
    min: 4,
  });
}
