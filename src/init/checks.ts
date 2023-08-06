// Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as inspector from "inspector";
import {
  defaultMasterDirectory,
  configPath,
  envExtensions,
  envQuotations,
} from "../envshh/defaults/defaults";
import { execSync } from "child_process";
import path from "path";
import { decryptString, encryptString } from "./encryption";

export interface IConfig {
  masterRepoUrl?: string;
  masterDirectory: string;
}

export function isGitInstalledAndPathed() {
  try {
    execSync("git --version");
    return true;
  } catch (error) {
    return false;
  }
}

export class Project {
  private readonly name: string;
  private readonly directory: string;
  private readonly envs: string[];
  private readonly branch: string;
  constructor(
    name: string,
    directory: string,
    envs: string[],
    branch: string,
  ) {}
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
  return isRepositoryExistsOnUpstream(address);
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
  return path.join(defaultMasterDirectory, "master");
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

export function isRepositoryExistsOnUpstream(repositoryAddress: string) {
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
    `git -C ${getMasterRepoPath()} commit -m "${new Date().toUTCString()}"`,
  );
  execSync(`git -C ${getMasterRepoPath()} push origin master`);
}

export function getCurrentWorkingDirectory() {
  return process.cwd();
}

export function getCurrentWorkingDirectoryName() {
  return getCurrentWorkingDirectory().split("\\").pop() as string;
}

export function getListOfEnvsInDirectory(directory: string) {
  const envs = [];
  for (let index = 0; index < envExtensions.length; index++) {
    const envExtension = envExtensions[index];
    const env = path.join(directory, envExtension);
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
  const value = line.substring(line.indexOf("=") + 1) as string;
  return value;
}

export function getQuteFromValue(value: string) {
  for (let index = 0; index < envQuotations.length; index++) {
    const quote = envQuotations[index];
    if (value.startsWith(quote) && value.endsWith(quote)) {
      return quote;
    }
  }
  return "";
}

export function getCleanValueFromLine(line: string) {
  const value = getQuotedValueFromLine(line);
  const quote = getQuteFromValue(value);
  return quote ? value.replaceAll(quote, "") : value;
}

export function getEncryptedValueFromLine(line: string, password: string) {
  const quotedValue = getQuotedValueFromLine(line);
  const originalValue = getCleanValueFromLine(line);
  const encryptedValue = encryptString(originalValue, password);
  const quote = getQuteFromValue(quotedValue);
  return quote ? `${quote}${encryptedValue}${quote}` : encryptedValue;
}

export function getDecryptedValueFromLine(line: string, password: string) {
  const quotedValue = getQuotedValueFromLine(line);
  const encryptedValue = getCleanValueFromLine(line);
  const originalValue = decryptString(encryptedValue, password);
  const quote = getQuteFromValue(quotedValue);
  return quote ? `${quote}${originalValue}${quote}` : originalValue;
}

export function getEncryptedEnv(location: string, password: string) {
  let encryptedEnv = "";
  const lines = readEnvByLine(location);
  const encryptedLines = [];
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim();
    if (line === "" || line.startsWith("#") || line === "\n") {
      encryptedLines.push(line);
      continue;
    }
    const key = line.substring(0, line.indexOf("=")).trim();
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
    if (line === "" || line.startsWith("#") || line === "\n") {
      decryptedLines.push(line);
      continue;
    }
    const key = line.substring(0, line.indexOf("=")).trim();
    const value = getDecryptedValueFromLine(line, password);
    decryptedLines.push(`${key}=${value}`);
  }
  decryptedEnv += decryptedLines.join("\n");
  return decryptedEnv;
}

export function getDirectoryWithoutEnvFile(location: string) {
  const paths = location.split("\\");
  paths.pop();
  return paths.join("\\");
}

export function saveEncryptedEnv(
  location: string,
  password: string,
  project: string,
) {
  const encryptedEnv = getEncryptedEnv(location, password);
  const destinationDirectory = path.join(
    getMasterRepoPath(),
    project || getCurrentWorkingDirectoryName(),
  );
  const destination = location.replace(process.cwd(), destinationDirectory);

  if (!fs.existsSync(getDirectoryWithoutEnvFile(destination))) {
    fs.mkdirSync(getDirectoryWithoutEnvFile(destination), { recursive: true });
  }

  fs.writeFileSync(destination, encryptedEnv);
}

function getProjectNameFromRepoUrl(url: string) {
  return url.split("/").pop()?.replace(".git", "");
}

function getGitRepoName(location: string) {
  if (isDirectoryAGitRepository(location)) {
    const origin = execSync("git config --get remote.origin.url").toString();
    return getProjectNameFromRepoUrl(origin) as string;
  }
  return "";
}

export function envshh_push(
  password: string,
  project = "",
  directory = "",
  file = "",
  branch = "development",
  offline = false,
) {
  if (!offline) {
    pullMasterRepo();
  }

  const envs = file
    ? [path.join(process.cwd(), file)]
    : getListOfEnvsInDirectory(
        directory ? path.join(process.cwd(), directory) : process.cwd(),
      );

  if (project === "") {
    project = getGitRepoName(process.cwd()).trim();
  }

  for (let index = 0; index < envs.length; index++) {
    const env = envs[index];
    saveEncryptedEnv(env, password, project);
  }
  if (!offline) {
    pushMasterRepo();
  }
}

export function envshh_pull(
  password: string,
  projectName = "",
  branch = "development",
  offline = false,
) {
  // TODO: Incomplete

  if (!offline) {
    pullMasterRepo();
  }
  const source = path.join(
    getMasterRepoPath(),
    projectName ||
      getGitRepoName(getCurrentWorkingDirectoryName()) ||
      getCurrentWorkingDirectoryName(),
    `.envshh-branch-${branch}`,
  );

  const envs = getAllEnvsFromMasterRepo(source);

  for (let index = 0; index < envs.length; index++) {
    const env = envs[index];
    const destination = path.join(
      process.cwd(),
      env.replace(
        path.join(
          getMasterRepoPath(),
          projectName || getCurrentWorkingDirectoryName(),
        ),
        "",
      ),
    );
    const decryptedEnv = getDecryptedEnv(env, password);
    if (!fs.existsSync(getDirectoryWithoutEnvFile(destination))) {
      fs.mkdirSync(getDirectoryWithoutEnvFile(destination), {
        recursive: true,
      });
    }
    fs.writeFileSync(destination, decryptedEnv);
  }
}

export function getAllEnvsFromMasterRepo(
  dirPath: string,
  arrayOfFiles: string[] = [],
) {
  const files = fs.readdirSync(dirPath);
  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllEnvsFromMasterRepo(
        dirPath + "/" + file,
        arrayOfFiles,
      );
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}
