// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export const configDirectory =
  process.platform === "win32"
    ? `${process.env.USERPROFILE}\\.envshh`
    : `${process.env.HOME}/.envshh`;
export const configPath =
  process.platform === "win32"
    ? `${process.env.USERPROFILE}\\.envshh\\config.json`
    : `${process.env.HOME}/.envshh/config.json`;

export const envExtensions = [
  ".env",
  ".env.development",
  ".env.test",
  ".env.production",
  ".env.local",
  ".env.development.local",
  ".env.test.local",
  ".env.production.local",
];

export const envQuotations = ["'", '"'];

export const excludedFiles = ["README.md", "Readme.md", ".gitignore"];
