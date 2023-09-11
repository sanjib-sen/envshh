---
title: branch
description: Core Concets - branch
---

A branch is a version of the .envs. You can have different versions of .envs for different environments like staging, production, etc. If the option is not specified, Envshh will use the default branch name `main`. You can change the default branch name in the config. See [configuration](/configuration) for more details.

## Usage

### As an option

`option: -b, --bracnh <branchName>`

#### Option Properties

- Optional: `true`
- Default: `main` or the value specified in the [configuration](/configuration)

#### Supported Commands

- [push](/commands/01-push)
- [pull](/commands/02-pull)
- [clone](/commands/05-clone)
- [remove](/commands/06-remove)

#### Example

  ```sh
  npx envshh pull -b staging
  ```
