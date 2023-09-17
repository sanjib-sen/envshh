---
title: project
description: Core Concets - project
---

A project is a collection of .envs or a single .env from a single project or app. If the option is not specified, Envshh will automatically detect the project name from the current git repository name. If there is no git repository, the current directory name will be the project name.

## Usage

### As an option

`option: -p, --project <projectName>`

#### Option Properties

- Optional: `true`
- Default: current git repository name or current directory name

#### Supported Commands

- [push](/commands/push)
- [pull](/commands/pull)
- [clone](/commands/clone)
- [remove](/commands/remove)

#### Example

```sh
npx envshh push -p my-awesome-project
```
