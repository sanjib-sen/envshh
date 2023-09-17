---
title: Installation
description: envshh | Installation
---

:::tip[Did you know?]
You can use Envshh without even installing? Just run `npx envshh` followed by envshh commands and you are good to go.
:::

If you are comfortable having it installed on your system and don't want to type `npx` all the time, you can install it

## Prerequisites

1. [git](https://git-scm.com/downloads)
   Envshh completely depends on git. Make sure you have git installed.

2. [NodeJS](https://nodejs.org/en/download)
   NodeJS comes with a package manager like `npm` by default with most of the systems. Make sure you have the package manager installed by running `npm --version`. If you prefer any other package manager like `pnpm` or `yarn`, Great. Use it to install / execute Envshh commands.

## Installation

You can install envshh using any of the following package managers

### with `npm`

```sh
npm install -g envshh
```

### with `pnpm`

```sh
pnpm install -g envshh
```

### with `yarn`

```sh
yarn global add envshh
```

## Uninstall

- First clear the database and delete the configuration directory. Learn More about this [here](/commands/db#clear)

  ```sh
  envshh db clear
  ```

- Then uninstall the package

  with `npm`

  ```sh
  npm uninstall -g envshh
  ```

  Or follow you package manager's uninstallation guide.
