// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.

import * as inspector from "inspector";

export function isInVerboseMode() {
  return (
    inspector.url() !== undefined ||
    process.env.DEBUG === "true" ||
    process.env.VERBOSE === "true"
  );
}
