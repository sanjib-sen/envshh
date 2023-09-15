// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export const verboseAction = (enabled: boolean) => {
  if (enabled) {
    process.env.VERBOSE = 'true';
  }
};
