---
title: offline
description: Core Concets - offline
---

envshh has been built on the idea that developers will store their data to a remotely hosted git repo so that they can get the .env's from anywhere, any device. In most cases developers are suggested to use their familiar git hosting providers such as ([GitHub](https://github.com), [GitLab](https://gitlab.com), [Gitee](https://gitee.com/), or even a [own self hosted git server](https://www.cyberciti.biz/open-source/github-alternatives-open-source-seflt-hosted/)) to use for creating a repository that will contain the .env files.

But it is completely understandable if you do not want to use any remote git repository hosted in the cloud. envshh has the option to use only [Local Directory](/core-concepts/instance#3-local-directory-path) to store the encrypted .envs locally with git features.
To do that, just do not provide a [Remote Repository URL](/core-concepts/instance#2-remote-repository-url) while creating an instance. Or [Modify the instance](/commands/instance#edit) and remove the [Remote Repository URL](/core-concepts/instance#2-remote-repository-url) from the instance.

envshh has also this feature where you set up the [Remote Repository URL](/core-concepts/instance#2-remote-repository-url) but you can temporary disable it for offline purposes (in case you lose your internet, or prefer not to push .envs to remote repository or pull from remote repository). In that case, you can use the `offline` option. Just provide the `offline` option when running the Commands (See Supported Commands below). For example, if you want to push your .envs to local directory, just run `npx envshh push -o` or `npx envshh push --offline`.

## Usage

### As an option

`option: -o, --offline`

#### Option Properties

- Optional: `true`
- Default: `false`

#### Supported Commands

- [push](/commands/push)
- [pull](/commands/pull)
- [remove](/commands/remove)

#### Example

```sh
npx envshh push -o
```
