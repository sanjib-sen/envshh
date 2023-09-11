---
title: env-path
description: Core Concets - env-path
---
Envshh will check for .env file patterns in the project root directory or working directory. If your .envs are not located in the project root, you can manually specify the .env file or directory where the .envs are located.

## Usage

### As an option

`option: -e, --env-path <envPath>` Seperated by space

#### Option Properties

- Optional: `true`
- Default: `./`
- Type: Multiple `string`s seperated by space

#### Supported Commands

- [push](/commands/01-push)
- [remove](/commands/05-remove)
- [pipe](/commands/04-pipe) (See [Below](#with-pipe-command))

#### Example

  ```sh
  npx envshh push -e newdirecotry/.env anotherdirecotory/.env.random
  ```

#### With pipe command

This option is also supported in `pipe` command. However,while using with the `pipe` command, you have to distinguish the .env files with a comma (,). For example, if you want to push two .env files located in `project-root/.env` and `project-root/my-awesome-directory/.env.random`, you have to specify the option as `-e .env,my-awesome-directory/.env.random`

:::caution
I am planning to remove this space seperation in the future releases. So, you can seperate the .env files with **comma (,)** instead of **space** for all commands
:::

:::note
The `pull` command will automatically bring the .envs following the directory structure when it was pushed. So, this option is not required in the `pull` command.
So if a .env file were pushed as `project-root/my-awesome-directory/.env` using the env-path option, `pull` will automatically bring the .env to `project-root/my-awesome-directory/.env`.

:::
