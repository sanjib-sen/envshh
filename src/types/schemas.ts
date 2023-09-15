// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { z } from 'zod';

import { isPathExists } from '../filesystem/checks.js';

const defaultValidRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

const defaultRegexNameConventionMessage = (type: string) => {
  return `${type} Name: Only letters, numbers, dash (-), underscore (_) are supported.
                      Name must start or end with a letter or number.
                      Name must be between 1 and 25 characters long.
                      Name cannot contain consecutive dash (-), underscore (_)
              `;
};

const defaultEnvPatterns = [
  '.env',
  '.env.development',
  '.env.test',
  '.env.production',
  '.env.local',
  '.env.development.local',
  '.env.test.local',
  '.env.production.local',
];

export const EnvshhInstanceNameSchema = z
  .string()
  .regex(defaultValidRegex, defaultRegexNameConventionMessage('Instance'))
  .min(1, { message: 'Instance Name cannot be empty' })
  .max(25, { message: 'Instance Name cannot be more than 25 characters' });

export const EnvshhBranchNameSchema = z
  .string()
  .regex(defaultValidRegex, defaultRegexNameConventionMessage('Branch'))
  .min(1, { message: 'Branch Name cannot be empty' })
  .max(25, { message: 'Branch Name cannot be more than 25 characters' });

export const EnvshhProjectNameSchema = z
  .string()
  .regex(defaultValidRegex, defaultRegexNameConventionMessage('Project'))
  .min(1, { message: 'Project Name cannot be empty' })
  .max(25, { message: 'Project Name cannot be more than 25 characters' });

export const EnvshhInstanceSchema = z.object({
  name: EnvshhInstanceNameSchema,
  localDirectory: z.string(),
  remoteRepoUrl: z.string().optional(),
});

export const configSchema = z.object({
  branchName: EnvshhBranchNameSchema.default('main'),
  instanceName: EnvshhInstanceNameSchema.default('personal'),
  envPatterns: z.array(z.string()).default(defaultEnvPatterns),
  envValueQuotations: z.array(z.string()).default(["'", '"']),
  localDirectory: z.string().refine((val) => isPathExists(val), {
    message: 'Invalid local directory path',
  }),
  ignoreFiles: z
    .array(z.string())
    .default(['README.md', 'Readme.md', '.gitignore']),
  branchNamePrefix: z.string().default('envshh-branch-'),
});

export const DBSchema = z.object({
  defaults: configSchema.describe('Defaults'),
  instances: z.array(EnvshhInstanceSchema).describe('Instances'),
});

export type EnvshhInstanceType = z.infer<typeof EnvshhInstanceSchema>;
export type EnvshhInstanceNameType = z.infer<typeof EnvshhInstanceNameSchema>;
export type EnvshhBranchNameType = z.infer<typeof EnvshhBranchNameSchema>;
export type EnvshhProjectNameType = z.infer<typeof EnvshhProjectNameSchema>;
export type configType = z.infer<typeof configSchema>;
export type DBType = z.infer<typeof DBSchema>;
