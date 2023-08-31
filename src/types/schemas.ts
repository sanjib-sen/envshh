// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { z } from "zod";
import {
  defaultRegexNameConventionMessage,
  defaultValidRegex,
} from "../envshh/defaults/defaults.js";

export const EnvshhInstanceNameSchema = z
  .string()
  .regex(defaultValidRegex, defaultRegexNameConventionMessage("Instance"))
  .min(1, { message: "Instance Name cannot be empty" })
  .max(25, { message: "Instance Name cannot be more than 25 characters" });
export const EnvshhInstanceSchema = z.object({
  name: EnvshhInstanceNameSchema,
  localDirectory: z.string(),
  remoteRepoUrl: z
    .string()
    // .url({ message: "Invalid Repository URL" })
    .optional(),
});

export type EnvshhInstanceType = z.infer<typeof EnvshhInstanceSchema>;
export type EnvshhInstanceNameType = z.infer<typeof EnvshhInstanceNameSchema>;
