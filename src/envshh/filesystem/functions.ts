import * as fs from "fs";
import { log } from "../log.js";

export function createDirectory(directoryPath: string, recursive = false) {
  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: recursive });
    }
  } catch (error) {
    log.error(`Failed to create directory ${directoryPath}.`);
  }
}

export function createFile(filePath: string, data: string) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, data);
    }
  } catch (error) {
    log.error(`Failed to create file ${filePath}.`);
  }
}
