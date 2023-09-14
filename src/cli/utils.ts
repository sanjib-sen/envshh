// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import { decryptString, encryptString } from "../envshh/encryption/lib.js";
import { log } from "../utils/log.js";
import { createFile, readFile } from "../filesystem/functions.js";
import { saveEncryptedEnv } from "../envshh/encryption/encrypt.js";
import path from "path";
import { saveDecryptedEnv } from "../envshh/encryption/decrypt.js";
import { theGenerate } from "../envshh/commands/generate.js";
import { askPassword } from "../utils/password.js";
import { defaultProjectName } from "../envshh/defaults/defaults.js";
import { runCommand } from "../utils/command.js";
import { thePull } from "../envshh/commands/pull.js";
import { getAllEnvsFromEnvPath } from "../envshh/envs/get.js";
import { readEnvByLine } from "../envshh/encryption/common.js";
import { spawnSync } from "child_process";
import {
  branchNameOption,
  envPathOption,
  instanceNameOption,
  offlineOption,
  projectNameOption,
} from "./common.js";
import { getProjectNameFromRepoUrl } from "../git/functions.js";

export const encryptFileCommand = new Command();
encryptFileCommand
  .name("encryptfile")
  .description("[Extra Utilities] Encrypt a file")
  .argument("<file>", "Specify the file to encrypt")
  .option(
    "-o, --output <output>",
    "Specify the output file name/path",
    path.join(process.cwd(), "encrypted.env"),
  )
  .option("-isenv, --isenv", "Specify if the file is a .env file", false)
  .option(
    "-r, --replace",
    "Replace the input file with the encrypted file",
    false,
  )
  .action((file, options) => {
    const password = askPassword(true);
    if (options.isenv) {
      saveEncryptedEnv(file, password, options.output);
      log.success(`Encrypted .env saved to ${options.output}`);
    } else {
      const decryptedString = readFile(file);
      const encryptedString = encryptString(decryptedString, password);
      createFile(options.output, encryptedString);
      log.success(`Encrypted file saved to ${options.output}`);
    }
  });

export const decryptFileCommand = new Command();
decryptFileCommand
  .name("decryptfile")
  .description("[Extra Utilities] Decrypt a file")
  .argument("<file>", "Specify the file to decrypt")
  .option(
    "-o, --output <output>",
    "Specify the output file name/path",
    path.join(process.cwd(), "decrypted.env"),
  )
  .option("-isenv, --isenv", "Specify if the file is a .env file", false)
  .option(
    "-r, --replace",
    "Replace the input file with the decrypted file",
    false,
  )
  .action((file, options) => {
    const password = askPassword(false);
    if (options.isenv) {
      saveDecryptedEnv(file, password, options.output);
      log.success(`Decrypted .env saved to ${options.output}`);
    } else {
      const encryptedString = readFile(file);
      const decryptedString = decryptString(encryptedString, password);
      createFile(options.output, decryptedString);
      log.success(`Decrypted file saved to ${options.output}`);
    }
  });

export const encryptTextCommand = new Command();
encryptTextCommand
  .name("encrypttext")
  .description("[Extra Utilities] Encrypt a text")
  .argument("<text>", "Specify the text to encrypt")
  .option("-o, --output <output-path>", "Output to file <path>")
  .action((text, options) => {
    const password = askPassword(true);
    const encrypted = encryptString(text, password);
    if (!options.output) {
      log.print(encrypted);
    } else {
      createFile(options.output, encrypted);
      log.success(`Encrypted text saved to ${options.output}`);
    }
  });

export const decryptTextCommand = new Command();
decryptTextCommand
  .name("decrypttext")
  .description("[Extra Utilities] Decrypt a text")
  .argument("<text>", "Specify the text to decrypt")
  .option("-o, --output <output-path>", "Output to file <path>")
  .action((text, options) => {
    const password = askPassword(false);
    const decrypted = decryptString(text, password);
    if (!options.output) {
      log.print(decrypted);
    } else {
      createFile(options.output, decrypted);
      log.success(`Decrypted text saved to ${options.output}`);
    }
  });

export const generateCommand = new Command();
generateCommand
  .name("generate")
  .description("Generate .env.example file")
  .option(
    "-e, --env <relative-path...>",
    "Specify input directory or file where the .env/.envs is/are located. Defaults to current directory.",
    [process.cwd()],
  )
  .option(
    "--value <value>",
    "Specify a value to replace empty values in the .env example file",
    "",
  )
  .option(
    "--suffix <suffix>",
    "Specify a suffix to put after the .env filename in place of 'example'",
    "example",
  )
  .action((options) => {
    theGenerate({
      envPath: options.env,
      value: options.value,
      suffix: options.suffix,
    });
  });

export const pipeCommand = new Command();
pipeCommand
  .name("pipe")
  .description("Load .env files directly and run command")
  .argument("<commands...>", "Commands to run")
  .addOption(envPathOption)
  .action((args, options) => {
    const files = getAllEnvsFromEnvPath(options.env.split(","));
    files.map((file) => {
      const linesFromFile = readEnvByLine(file);
      linesFromFile.map((line) => {
        const key = line.substring(0, line.indexOf("=")).trim();
        const value = line.substring(line.indexOf("=") + 1).trim();
        process.env[key] = value;
      });
    });
    log.info(
      `.env variables are piped to stdin. Now running: ${args.join(" ")}`,
    );
    spawnSync(args[0], args.slice(1), { stdio: "inherit" });
  });

export const cloneCommand = new Command();
cloneCommand
  .name("clone")
  .description("git clone and envshh pull at the same time")
  .argument("<repo>", "Repository url")
  .argument("[directory]", "Directory name")
  .addOption(projectNameOption)
  .addOption(branchNameOption)
  .addOption(instanceNameOption)
  .addOption(offlineOption)
  .allowUnknownOption()
  .action((repo, directory, options) => {
    if (!directory) {
      directory = getProjectNameFromRepoUrl(repo);
    }
    runCommand(
      `git -C ${process.cwd()} clone ${repo} ${directory}`,
      true,
      true,
    );
    process.chdir(directory);
    const password = askPassword(false);
    thePull({
      password: password,
      name: options.project || defaultProjectName,
      branch: options.branch,
      offline: options.offline,
      instance: options.instance,
    });
  });
