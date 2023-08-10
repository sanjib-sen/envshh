// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { z } from "zod";
import {
  defaultInstanceName,
  defaultMainDirectory,
  defaultRegexNameConventionMessage,
  defaultValidRegex,
} from "../envshh/defaults/defaults.js";

export const EnvshhInstanceNameSchema = z
  .string()
  .regex(defaultValidRegex, defaultRegexNameConventionMessage("Instance"))
  .min(1)
  .max(25)
  .default(defaultInstanceName);

export const EnvshhInstanceSchema = z
  .object({
    name: EnvshhInstanceNameSchema,
    mainDirectory: z.string().default(defaultMainDirectory),
    mainRepoUrl: z
      .string()
      .url({ message: "Invalid Repository URL" })
      .optional(),
  })
  .default({
    mainDirectory: defaultMainDirectory,
  });

export type EnvshhInstanceType = z.infer<typeof EnvshhInstanceSchema>;
export type EnvshhInstanceNameType = z.infer<typeof EnvshhInstanceNameSchema>;
