// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.

export function isInVerboseMode() {
  return process.env.DEBUG === 'true' || process.env.VERBOSE === 'true';
}
