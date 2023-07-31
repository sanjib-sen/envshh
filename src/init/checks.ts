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
import { encryptString } from "./encryption";

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
  fs.mkdirSync(getMasterRepoPath());
}

export function isMasterRepoSet() {
  const config: IConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  return config.masterRepoUrl.startsWith("https://github.com/") ? true : false;
}

export function isMasterRepoAddressValid() {
  if (!isMasterRepoSet()) return false;
  const config: IConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  return isRepositoryExistsOnGitHub(config.masterRepoUrl);
}

export function getMasterRepoAddress() {
  const config: IConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  return config.masterRepoUrl;
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

export function cloneMasterRepo() {
  const config: IConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  execSync(`git clone ${config.masterRepoUrl} ${getMasterRepoPath()}`);
}

export function pullMasterRepo() {
  execSync(`git -C ${getMasterRepoPath()} pull`);
}

export function pushMasterRepo() {
  execSync(
    `git -C ${getMasterRepoPath()} commit -a -m ${new Date().toString()}`
  );
  execSync(`git -C ${getMasterRepoPath()} push origin main`);
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

export function envshh_push(password: string, directory: "", file: "") {
  pullMasterRepo();
  const envs = file
    ? getListOfEnvsInLocation(directory ? directory : process.cwd())
    : [file];
  for (let index = 0; index < envs.length; index++) {
    const env = envs[index];
    saveEncryptedEnv(env, password);
  }
  pushMasterRepo();
}
