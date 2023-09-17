---
title: env-path
description: Core Concets - env-path
---

Envshh will check for .env file patterns in the project root directory or working directory. If your .envs are not located in the project root, you can manually specify the .env file or directory where the .envs are located.

## Usage

### As an option

`option: -e, --env-path <envPath>` Seperated by comma (,)

#### Option Properties

- Optional: `true`
- Default: Current Working directory (cwd)
- Type: Single String or Multiple `string`s seperated by comma (,). Each string can be a relaive file or a directory path.

#### Supported Commands

- [push](/commands/push)
- [generate](/commands/generate)
- [pipe](/commands/pipe)
- [remove](/commands/remove)

#### Example

```sh
npx envshh push -e newdirecotry/.env anotherdirecotory/.env.random
```

:::note
The [`pull`](/commands/pull) command will automatically bring the .envs following the directory structure when it was pushed. So, this option is not required in the [`pull`](/commands/pull) command.
So if a .env file were pushed as `project-root/my-awesome-directory/.env` using the env-path option, [`pull`](/commands/pull) will automatically bring the .env to `project-root/my-awesome-directory/.env`.
:::
