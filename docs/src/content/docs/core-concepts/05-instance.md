---
title: instance
description: Core Concets - instance
---

Suppose you you are working on a personal project, and a office project. You want to save your personal .env files to a git repo and office .env files to another git repo. So it will only be convenient if we can set up multiple Remote Repositories. That's where the `instance` comes in.

## Instance Configuration

An `instance` is configured with 3 things.

### 1. Name of the instance

An instance will have a name so that you can push your .envs just using the instance name. For example, if you have an instance named `work`, you can push your .envs just by running `npx envshh push -i work`. Or pull from `work` instance by running `npx envshh pull -i work`.

### 2. Remote Repository URL

Remote repository url is the address of the remote repositoy where you want to push your .envs. You can use any git repository like GitHub, GitLab, or even your own self-hosted git server.

### 3. Local Directory Path

Envshh will save all the .envs encrypted in a local directory with git initiated. In case you lose your internet and need to do an offline pull or push, local directory is pretty effective. This option is the path of that local directory. If the directory does not exist, Envshh will create it for you.

## Usage

### As an option

`option: -i, --instance <instanceName>`

#### Option Properties

- Optional: `true`
- Default: `personal` or the value specified in the [configuration](/configuration)

#### Supported Commands

- [push](/envshh/commands/01-push)
- [pull](/envshh/commands/02-pull)
- [clone](/envshh/commands/05-clone)
- [remove](/envshh/commands/06-remove)

#### Example

  ```sh
  npx envshh push -e newdirecotry/.env anotherdirecotory/.env.random
  ```

### As Command

You can create unlimited instances and save the .envs to different git repositories.

Creates a new instance

```sh
envshh instance create <options>
```

Modify an existing instance

```sh
envshh instance edit <options>
```

Delete an existing instance

```sh
envshh instance delete <options>
```

List all the instances

```sh
envshh list
```

See [instance](/commands/instance) for more details.

<!-- This option will create a new directory in the git repo with the instance name and save the .envs there. If the option is not specified, Envshh will use the default instance name `personal`. You can change the default instance name in the config. See [configuration](/configuration) for more details. -->
