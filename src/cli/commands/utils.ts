// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Command } from '@commander-js/extra-typings';

import { decryptString, encryptString } from '../../encryption/lib.js';
import { saveDecryptedEnv } from '../../envshh/functions/decrypt.js';
import { saveEncryptedEnv } from '../../envshh/functions/encrypt.js';
import { createFile, readFile } from '../../filesystem/functions.js';
import { log } from '../../utils/log.js';
import { askPassword } from '../../utils/password.js';
import { verboseAction } from './common/actions.js';
import {
  inputFileArgument,
  isEnvOption,
  outputFileOption,
  replaceOption,
  verboseOption,
} from './common/options.js';

export const encryptFileCommand = new Command();
encryptFileCommand
  .name('encryptfile')
  .description('Encrypt a file')
  .addArgument(inputFileArgument)
  .addOption(outputFileOption)
  .addOption(isEnvOption)
  .addOption(replaceOption)
  .addOption(verboseOption)
  .action((file, options) => {
    verboseAction(options.verbose);
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
  .name('decryptfile')
  .description('Decrypt a file')
  .addArgument(inputFileArgument)
  .addOption(outputFileOption)
  .addOption(isEnvOption)
  .addOption(replaceOption)
  .addOption(verboseOption)
  .action((file, options) => {
    verboseAction(options.verbose);
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
  .name('encrypttext')
  .description('Encrypt a text')
  .argument('<text>', 'Specify the text to encrypt')
  .option('-o, --output <output-path>', 'Output to file <path>')
  .addOption(verboseOption)
  .action((text, options) => {
    verboseAction(options.verbose);
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
  .name('decrypttext')
  .description('Decrypt a text')
  .argument('<text>', 'Specify the text to decrypt')
  .option('-o, --output <output-path>', 'Output to file <path>')
  .addOption(verboseOption)
  .action((text, options) => {
    verboseAction(options.verbose);
    const password = askPassword(false);
    const decrypted = decryptString(text, password);
    if (!options.output) {
      log.print(decrypted);
    } else {
      createFile(options.output, decrypted);
      log.success(`Decrypted text saved to ${options.output}`);
    }
  });

export const utilityCommand = new Command();
utilityCommand
  .name('utils')
  .description(
    'More handy tools that might be useful for encryption and decryption',
  )
  .addCommand(encryptFileCommand)
  .addCommand(decryptFileCommand)
  .addCommand(encryptTextCommand)
  .addCommand(decryptTextCommand);
