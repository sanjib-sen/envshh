#! /usr/bin/env node

// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { program } from "./cli/root.js";
import { defaultLocalDirectory } from "./envshh/defaults/defaults.js";
import { createDirectory } from "./filesystem/functions.js";

console.log("Envshh CLI");
createDirectory(defaultLocalDirectory);

program.parse();
