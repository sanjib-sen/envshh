// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.

import * as inspector from "inspector";

export function isInDebugMode() {
  return inspector.url() !== undefined;
}
