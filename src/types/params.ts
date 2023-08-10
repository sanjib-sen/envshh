// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { z } from "zod";
import {
  defaultValidRegex,
  defaultRegexNameConventionMessage,
  defaultBranchName,
} from "../envshh/defaults/defaults.js";
import { EnvshhInstanceNameSchema, EnvshhInstanceType } from "./schemas.js";

export type EnvshhConfigParamsType = {
  name?: string;
  mainDirectory?: string;
};

export const ProjectConfigParans = z.object({
  name: z
    .string()
    .regex(defaultValidRegex, defaultRegexNameConventionMessage("Project"))
    .min(1)
    .max(25),
  instance: EnvshhInstanceNameSchema,
  branch: z
    .string()
    .regex(defaultValidRegex, defaultRegexNameConventionMessage("Branch"))
    .min(1)
    .max(25)
    .default(defaultBranchName),
  offline: z.boolean().default(false),
  password: z.string().min(1).max(255),
});

export const envPath = z
  .string()
  .max(255, "Path can't be more than 255 characters!")
  .default("");

export const ProjectPushConfigParams = ProjectConfigParans.extend({ envPath });

export type ProjectConfigParansType = z.infer<typeof ProjectConfigParans>;
export type ProjectPushConfigParamsType = z.infer<
  typeof ProjectPushConfigParams
>;

type RequireAtLeastOneParam<T, R extends keyof T = keyof T> = Omit<T, R> &
  { [P in R]: Required<Pick<T, P>> & Partial<Omit<T, P>> }[R];

export type EnvshhInstanceModifyParamsType = Pick<EnvshhInstanceType, "name"> &
  RequireAtLeastOneParam<
    EnvshhInstanceType,
    "mainDirectory" | "mainRepoUrl" | "name"
  >;