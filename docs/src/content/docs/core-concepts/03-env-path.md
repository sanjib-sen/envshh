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
- Default: `./`
- Type: Single or Multiple `string`s seperated by comma (,)

#### Supported Commands

- [push](/commands/01-push)
- [generate](/commands/03-generate)
- [pipe](/commands/04-pipe)
- [remove](/commands/06-remove)

#### Example

```sh
npx envshh push -e newdirecotry/.env anotherdirecotory/.env.random
```

:::note
The `pull` command will automatically bring the .envs following the directory structure when it was pushed. So, this option is not required in the `pull` command.
So if a .env file were pushed as `project-root/my-awesome-directory/.env` using the env-path option, `pull` will automatically bring the .env to `project-root/my-awesome-directory/.env`.
:::
