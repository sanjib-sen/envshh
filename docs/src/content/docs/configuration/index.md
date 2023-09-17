---
title: Configuration
description: Configuration and Customization | envshh
---

One of the most important features of envshh is the ability to customize it to your needs.

The configuration file is located at `~/.config/.envshh/config.json` (`%USERPROFILE%\.enshh\config.json` in Windows) and is created automatically when you run any envshh [command](/commands). The config file is in JSON format and can be edited manually. The [database](#instances) is also stored in the same file. So the `config.json` file will act both as a configuration file and a database. But this might be changed in the future based on user feedback.

The config file is divided into 2 main sections:

- [defaults](#defaults)
  - [branchName](#branchname)
  - [instanceName](#instancename)
  - [localDirectory](#localdirectory)
  - [envPatterns](#envpatterns)
  - [envValueQuotations](#envvaluequotations)
  - [ignoreFiles](#ignorefiles)
  - [branchNamePrefix](#branchnameprefix)
- [instances](#instances)

## defaults

Let's see an example first,

```json
{
    "defaults": {
        "branchName": "main",
        "instanceName": "personal",
        "localDirectory":
            "process.platform" === "win32"
                ? "${process.env.USERPROFILE}\\.envshh"
                : "`${process.env.HOME}/.config/.envshh",
        "envPatterns": [
            ".env",
            ".env.development",
            ".env.test",
            ".env.production",
            ".env.local",
            ".env.development.",
            ".env.test.local",
            ".env.production.local",
        ],
        "envValueQuotations": ["'", "\""],
        "ignoreFiles": ["README.md", "Readme.md", ".gitignore"],
        "branchNamePrefix": "envshh-branch-",
  },
}
```

Let's see what each of these fields indicates.

### branchName

The name of the [branch](/core-concepts/branch) where the .envs will be pushed to or pulled from if [branchName option](/core-concepts/branch/#as-an-option) is not specified with the commands. The default value is `main`. You can change it to `staging` or `production` or anything you want.

```json
{
  "defaults": {
    "branchName": "main"
  }
}
```

### instanceName

The name of the [instance](/core-concepts/instance) where the .envs will be pushed to or pulled from if [instanceName option](/core-concepts/instance/#as-an-option) is not specified with the commands. The default value is `personal`. You can change it to `work` or `office` or anything you want.

```json
{
  "defaults": {
    "instanceName": "personal"
  }
}
```

### localDirectory

The path of the local directory where the .envs will be saved if no other instance except from the [default](#instancename) one is created. The default value is `~/.config/.envshh` in Linux and `C:\Users\{username}\.envshh` in Windows. You can change it to any path you want.

The [configuration file](/configuration) `config.json` will be saved in this directory. So, if you change the directory, first move the configuration file to the new directory.

```json
{
    "defaults": {
        "localDirectory":
            "process.platform" === "win32"
                ? "${process.env.USERPROFILE}\\.envshh"
                : "`${process.env.HOME}/.config/.envshh",
    },
}
```

### envPatterns

The patterns of the .env files that will be pushed or pulled if no other [envPath option](/core-concepts/env-path/#as-an-option) is specified with the commands. The default value is

```json
{
  "defaults": {
    "envPatterns": [
      ".env",
      ".env.development",
      ".env.test",
      ".env.production",
      ".env.local",
      ".env.development.",
      ".env.test.local",
      ".env.production.local"
    ]
  }
}
```

### envValueQuotations

The quotations that will be used to wrap the values of the .envs.

For example:

`"`:
MY_DB_URL="https://my-db-url.com"

`'`:
MY_DB_URL='https://my-db-url.com'

Seems unnecessary. But sometimes it is important if you have predefined suffix or prefix in your .env values.

```json
{
  "defaults": {
    "envValueQuotations": ["'", "\""]
  }
}
```

### ignoreFiles

Ignore this. Will be removed in the future.

### branchNamePrefix

The prefix of the branch name directory that will be created when you run the [push](/commands/push) command. The default value is `envshh-branch-`. So, if you run the [push](/commands/push) command, a directory named `envshh-branch-<instance-name>` will be created inside the [instance](/core-concepts/instance#3-local-directory-path)/[projectName](/core-concepts/project) directory. For example, if the instance name is `work`, the directory name will be `envshh-branch-work`.

```json
{
  "defaults": {
    "branchNamePrefix": "envshh-branch-"
  }
}
```

## instances

The instances section is an array of objects. Each object represents an [instance](/core-concepts/instance). The default instance is `personal`. You can create as many instances as you want. Each instance will have 3 properties.

This will act as a Database of Instances and can be managed using the [db](/commands/db) command.

:::danger
Do not modify the instances section manually. Use the [db](/commands/db) command to manage the instances.
Otherwise, you might lose your .env data.
:::

Example:

```json
{
  "instances": [
    {
      "instanceName": "personal",
      "remoteRepoUrl": "https://github.com/sanjib-sen/my-secrets.git",
      "localDirectoryPath": "/home/codes/my-secrets"
    },
    {
      "instanceName": "work",
      "remoteRepoUrl": "https://github.com/my-workplace/workplace-secrets.git",
      "localDirectoryPath": "/home/work/workplace-secrets"
    }
  ]
}
```
