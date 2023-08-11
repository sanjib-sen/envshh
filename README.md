<!--
 Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>

 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# starter-node

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [NPM Scripts](#npm_scripts)

## About

A always up-to-date starter template for Node.js projects with [TypeScript](https://www.typescriptlang.org/), [Nodemon](https://npmjs.com/package/nodemon), [Prettier](https://prettier.io), [ESLint](https://eslint.org), [Docker](https://www.docker.com/), and [docker-compose](https://docs.docker.com/compose/) support.

## Getting Started

Just use this as a [template](https://github.com/new?template_name=starter-node&template_owner=sanjib-sen) for your new project and you are good to go.

## NPM Scripts

| **Command**           | **Action**                                                                                                 | **preCommands**                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `npm install`         | Install all necessary dependencies                                                                         |                                   |
| `npm run dev`         | Run and monitor changes using [nodemon](https://npmjs.com/package/nodemon)                                 |                                   |
| `npm run build`       | Compile Typescript files to JavaScript. (Output directory=`/dist`)                                         | `npm run format && npm run lint`  |
| `npm run format`      | Format files using [Prettier](https://prettier.io)                                                         |                                   |
| `npm run lint`        | Check and Fix Linting issues using [ESLint](https://eslint.org)                                            |                                   |
| `npm run start`       | Compile TypeScript Files to JavaScript and run.                                                            | `npm run build`                   |
| `npm run docker:up`   | Prepare, build and run Docker container using [docker-compose up](https://docs.docker.com/compose) command | `docker-compose build --no-cache` |
| `npm run docker:down` | Stop Docker container using [docker-compose down](https://docs.docker.com/compose) command                 |                                   |

# Envshh Instance personal

# Envshh Instance personal
