// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export const defaultLocalDirectory =
  process.platform === "win32"
    ? `${process.env.USERPROFILE}\\.envshh`
    : `${process.env.HOME}/.config/.envshh`;
export const defaultDBPath =
  process.platform === "win32"
    ? `${process.env.USERPROFILE}\\.envshh\\db.json`
    : `${process.env.HOME}/.config/.envshh/db.json`;

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

export const defaultValidRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

export const defaultBranchNamePrefix = "envshh-branch-";

export const defaultRegexNameConventionMessage = (type: string) => {
  return `${type} Name: Only letters, numbers, dash (-), underscore (_) are supported.
                  Name must start or end with a letter or number.
                  Name must be between 1 and 25 characters long.
                  Name cannot contain consecutive dash (-), underscore (_)
          `;
};

export const defaultInstanceName = "personal";

export const defaultBranchName = "main";
