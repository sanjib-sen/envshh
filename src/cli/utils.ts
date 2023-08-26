// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Command } from "@commander-js/extra-typings";
import * as readlineSync from "readline-sync";
import { decryptString, encryptString } from "../envshh/encryption/lib.js";
import { log } from "../utils/log.js";
import { createFile, readFile } from "../filesystem/functions.js";
import { saveEncryptedEnv } from "../envshh/encryption/encrypt.js";
import path from "path";
import { saveDecryptedEnv } from "../envshh/encryption/decrypt.js";
import { theGenerate } from "../envshh/commands/generate.js";

export const encryptFileCommand = new Command();
encryptFileCommand
  .name("encryptfile")
  .description("Encrypt a file")
  .argument("<file>", "Specify the file to encrypt")
  .option(
    "-o, --output <output>",
    "Specify the output file name/path",
    path.join(process.cwd(), "encrypted.env")
  )
  .option("-isenv, --isenv", "Specify if the file is a .env file", false)
  .option(
    "-r, --replace",
    "Replace the input file with the encrypted file",
    false
  )
  .action((file, options) => {
    const password = readlineSync.question("Password: ", {
      hideEchoBack: true,
    });
    if (options.isenv) {
      saveEncryptedEnv(file, password, options.output);
    } else {
      const decryptedString = readFile(file);
      const encryptedString = encryptString(decryptedString, password);
      createFile(options.output, encryptedString);
    }
  });

export const decryptFileCommand = new Command();
decryptFileCommand
  .name("decryptfile")
  .description("Decrypt a file")
  .argument("<file>", "Specify the file to decrypt")
  .option(
    "-o, --output <output>",
    "Specify the output file name/path",
    path.join(process.cwd(), "decrypted.env")
  )
  .option("-isenv, --isenv", "Specify if the file is a .env file", false)
  .option(
    "-r, --replace",
    "Replace the input file with the decrypted file",
    false
  )
  .action((file, options) => {
    const password = readlineSync.question("Password: ", {
      hideEchoBack: true,
    });
    if (options.isenv) {
      saveDecryptedEnv(file, password, options.output);
    } else {
      const encryptedString = readFile(file);
      const decryptedString = encryptString(encryptedString, password);
      createFile(options.output, decryptedString);
    }
  });

export const encryptTextCommand = new Command();
encryptTextCommand
  .name("encrypttext")
  .description("Encrypt a text")
  .argument("<text>", "Specify the text to encrypt")
  .option("-o, --output <output-path>", "Output to file <path>")
  .action((text, options) => {
    const password = readlineSync.question("Password: ", {
      hideEchoBack: true,
    });
    const encrypted = encryptString(text, password);
    if (!options.output) {
      log.print(encrypted);
    } else {
      createFile(options.output, encrypted);
    }
  });

export const decryptTextCommand = new Command();
decryptTextCommand
  .name("decrypttext")
  .description("Decrypt a text")
  .argument("<text>", "Specify the text to decrypt")
  .option("-o, --output <output-path>", "Output to file <path>")
  .action((text, options) => {
    const password = readlineSync.question("Password: ", {
      hideEchoBack: true,
    });
    const decrypted = decryptString(text, password);
    if (!options.output) {
      log.print(decrypted);
    } else {
      createFile(options.output, decrypted);
    }
  });

export const generateCommand = new Command();
generateCommand
  .name("generate")
  .description("Generate .env.example file")
  .option(
    "-e, --env <relative-path>",
    "Specify input directory or file where the .env/.envs is/are located. Defaults to current directory.",
    process.cwd()
  )
  .option(
    "--value <value>",
    "Specify a value to replace empty values in the .env example file",
    ""
  )
  .option(
    "--suffix <suffix>",
    "Specify a suffix to put after the .env filename in place of 'example'",
    "example"
  )
  .action((options) => {
    theGenerate({
      envPath: options.env,
      value: options.value,
      suffix: options.suffix,
    });
  });
