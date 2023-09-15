// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { DBshow } from '../../../db/controllers.js';
import { EnvshhInstanceNameType } from '../../../types/schemas.js';

export function showDB(instance: EnvshhInstanceNameType | undefined) {
  DBshow(instance);
}
