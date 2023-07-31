// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as inspector from "inspector";
import * as fs from "fs";
import {
  configDirectory,
  configPath,
  envExtensions,
  envQuotations,
} from "./paths";
import { execSync } from "child_process";
import path from "path";
import { decryptString, encryptString } from "./encryption";

export interface IConfig {
  masterRepoUrl: string;
}

export function isGitInstalledAndPathed() {
  try {
    execSync("git --version");
    return true;
  } catch (error) {
    return false;
  }
}

export function isDirectoryExists() {
  return fs.existsSync(configDirectory) ? true : false;
}

export function isConfigFileExists() {
  return fs.existsSync(configPath) ? true : false;
}

export function isMasterRepoExists() {
  return fs.existsSync(getMasterRepoPath()) ? true : false;
}

export function isMasterRepoIsGit() {
  return isDirectoryAGitRepository(getMasterRepoPath());
}

export function createMasterRepo() {
  try {
    fs.mkdirSync(getMasterRepoPath());
  } catch (error) {
    new Error("Failed to create master repository.");
  }
}

export function isMasterRepoSet() {
  try {
    const config: IConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return config.masterRepoUrl.startsWith("https://github.com/")
      ? true
      : false;
  } catch (error) {
    return new Error("Failed to get master repository address.");
  }
}

export function isMasterRepoAddressValid() {
  const address = getMasterRepoAddress();
  if (address instanceof Error) {
    return address;
  }
  return isRepositoryExistsOnGitHub(address);
}

export function getMasterRepoAddress() {
  try {
    const config: IConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return config.masterRepoUrl;
  } catch (error) {
    return new Error("Failed to get master repository address.");
  }
}

export function getMasterRepoPath() {
  return path.join(configDirectory, "master");
}

export function isDirectoryAGitRepository(directory: string) {
  try {
    execSync(`git -C ${directory} rev-parse --is-inside-work-tree`, {
      stdio: "ignore",
    });
    return true;
  } catch (error) {
    return false;
  }
}

export function isRepositoryExistsOnGitHub(repositoryAddress: string) {
  try {
    execSync(`git ls-remote ${repositoryAddress}`);
    return true;
  } catch (error) {
    return false;
  }
}

export function isInDebugMode() {
  return inspector.url() !== undefined;
}

export function cloneMasterRepo(address: string) {
  createMasterRepo();
  try {
    execSync(`git clone ${address} ${getMasterRepoPath()}`);
    return true;
  } catch (error) {
    return new Error("Failed to clone master repository.");
  }
}

export function pullMasterRepo() {
  execSync(`git -C ${getMasterRepoPath()} pull`);
}

export function pushMasterRepo() {
  execSync(`git -C ${getMasterRepoPath()} add .`);
  execSync(
    `git -C ${getMasterRepoPath()} commit -m "${new Date().toUTCString()}"`
  );
  execSync(`git -C ${getMasterRepoPath()} push origin master`);
}

export function getCurrentWorkingDirectory() {
  return process.cwd();
}

export function getCurrentWorkingDirectoryName() {
  return getCurrentWorkingDirectory().split("\\").pop() as string;
}

export function getListOfEnvsInLocation(location: string) {
  const envs = [];
  for (let index = 0; index < envExtensions.length; index++) {
    const envExtension = envExtensions[index];
    const env = path.join(location, envExtension);
    if (fs.existsSync(env)) {
      envs.push(env);
    }
  }
  return envs;
}

export function readEnv(path: string) {
  const env = fs.readFileSync(path, "utf8");
  return env;
}

export function readEnvByLine(path: string) {
  const env = readEnv(path);
  return env.split(/\r?\n/);
}

export function getQuotedValueFromLine(line: string) {
  const value = line.split("=")[1] as string;
  return value;
}

export function getQuteFromValue(value: string) {
  for (let index = 0; index < envQuotations.length; index++) {
    const quote = envQuotations[index];
    if (value.startsWith(quote) && value.endsWith(quote)) {
      return quote;
    }
  }
}

export function getCleanValueFromLine(line: string) {
  const value = getQuotedValueFromLine(line);
  const quote = getQuteFromValue(value);
  return quote ? value.replace(quote, "") : value;
}

export function getEncryptedValueFromLine(line: string, password: string) {
  const originalValue = getCleanValueFromLine(line);
  const encryptedValue = encryptString(originalValue, password);
  const quote = getQuteFromValue(originalValue);
  return quote ? `${quote}${encryptedValue}${quote}` : encryptedValue;
}

export function getDecryptedValueFromLine(line: string, password: string) {
  const encryptedValue = getCleanValueFromLine(line);
  const originalValue = decryptString(encryptedValue, password);
  const quote = getQuteFromValue(encryptedValue);
  return quote ? `${quote}${originalValue}${quote}` : originalValue;
}

export function getEncryptedEnv(location: string, password: string) {
  let encryptedEnv = "";
  const lines = readEnvByLine(location);
  const encryptedLines = [];
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const key = line.split("=")[0].trim();
    const value = getEncryptedValueFromLine(line, password);
    encryptedLines.push(`${key}=${value}`);
  }
  encryptedEnv += encryptedLines.join("\n");
  return encryptedEnv;
}

export function getDecryptedEnv(location: string, password: string) {
  let decryptedEnv = "";
  const lines = readEnvByLine(location);
  const decryptedLines = [];
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const key = line.split("=")[0].trim();
    const value = getDecryptedValueFromLine(line, password);
    decryptedLines.push(`${key}=${value}`);
  }
  decryptedEnv += decryptedLines.join("\n");
  return decryptedEnv;
}

export function saveEncryptedEnv(location: string, password: string) {
  const encryptedEnv = getEncryptedEnv(location, password);
  const destinationDirectory = path.join(
    getMasterRepoPath(),
    getCurrentWorkingDirectoryName()
  );
  const destination = location.replace(process.cwd(), destinationDirectory);
  if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory, { recursive: true });
  }

  fs.writeFileSync(destination, encryptedEnv);
}

export function envshh_push(password: string, directory = "", file = "") {
  pullMasterRepo();

  const envs = file
    ? [file]
    : getListOfEnvsInLocation(directory ? directory : process.cwd());

  for (let index = 0; index < envs.length; index++) {
    const env = envs[index];
    saveEncryptedEnv(env, password);
  }
  pushMasterRepo();
}

export function envshh_pull(password: string, projectName = "") {
  // TODO: Incomplete
  pullMasterRepo();
  const source = path.join(getMasterRepoPath(), projectName);
  const destination = process.cwd();
  fs.cpSync(source, destination);
}
