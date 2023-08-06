// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { z } from "zod";
import {
  defaultMainDirectory,
  defaultRegexNameConventionMessage,
  defaultValidRegex,
} from "../defaults/defaults.js";

export const EnvshhConfigSchema = z
  .object({
    name: z
      .string()
      .regex(defaultValidRegex, defaultRegexNameConventionMessage("Project"))
      .min(1)
      .max(25)

      .default("main"),
    mainDirectory: z.string().default(defaultMainDirectory),
    mainRepoUrl: z
      .string()
      .url({ message: "Invalid Repository URL" })
      .optional(),
  })
  .default({
    mainDirectory: defaultMainDirectory,
  });

export type EnvshhConfigType = z.infer<typeof EnvshhConfigSchema>;
