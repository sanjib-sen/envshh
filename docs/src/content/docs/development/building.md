---
title: Install or Build from Source
description: Install and Build From Source | envshh
---

Make sure you have [Node.js](https://nodejs.org/en/) and [git](https://git-scm.com/downloads) installed on your system.

## Install

```sh
git clone https://github.com/sanjib-sen/envshh.git
cd envshh
npm install
npm run register
```

Now `envshh` will be installed globally as a npm package and you can use `envshh` from anywhere in your system.

## Build

```sh
git clone https://github.com/sanjib-sen/envshh.git
cd envshh
npm install
npm run build
```

Now you can use `envshh` using `node dist/envshh.cjs [command] [options] [arguments]` from the project directory.

## Compile (Create Executible)

```sh
git clone https://github.com/sanjib-sen/envshh.git
cd envshh
npm install
npm run build
npm run compile
```

An executible will be created in `builds` directory following your operating system. Now you can use `envshh` using `./builds/envshh [command] [options] [arguments]` for Linux and Mac and `./builds/envshh.exe [command] [options] [arguments]` for Windows from the project directory.
You can add the `builds` directory to your `PATH` to use `envshh` from anywhere in your system.

## Scripts

There are lot of premade scripts in the `package.json` file.

```json
{
  "scripts": {
    "lint": "eslint --fix .",
    "format": "prettier -w . --log-level warn",
    "clean": "$npm_execpath run clean:win32 && $npm_execpath run clean:unix",
    "clean:win32": "node -e \"if (process.platform === 'win32') process.exit(1)\" || , if exist dist rmdir /Q /S dist builds",
    "clean:unix": "node -e \"if (process.platform !== 'win32') process.exit(1)\" || rm -rf dist builds",
    "build": "$npm_execpath run clean && $npm_execpath run lint && $npm_execpath run format && node esbuild.mjs",
    "test": "$npm_execpath run build && $npm_execpath run compile && ./builds/envshh -v",
    "register": "$npm_execpath run build && cd dist && $npm_execpath install -g .",
    "postversion": "npx npm-check-updates -u && $npm_execpath install && $npm_execpath run build && $npm_execpath run compile && ./builds/envshh -v",
    "prepare": "husky install",
    "compile": "pkg ./dist/envshh.cjs --out-path=./builds -t latest",
    "compile:linux-x64": "pkg ./dist/envshh.cjs --out-path=./builds/linux/x64 -t latest-linux-x64",
    "compile:win-x64": "pkg ./dist/envshh.cjs --out-path=./builds/win/x64 -t latest-win-x64",
    "compile:mac-x64": "pkg ./dist/envshh.cjs --out-path=./builds/mac/x64 -t latest-mac-x64",
    "compile:linx-arm64": "pkg ./dist/envshh.cjs --out-path=./builds/linux/arm64 -t latest-linux-arm64",
    "compile:win-arm64": "pkg ./dist/envshh.cjs --out-path=./builds/win/arm64 -t latest-win-arm64",
    "compile:mac-arm64": "pkg ./dist/envshh.cjs --out-path=./builds/mac/arm64 -t latest-mac-arm64",
    "compile:linux": "$npm_execpath run compile:linux-x64 && $npm_execpath run compile:linx-arm64",
    "compile:win": "$npm_execpath run compile:win-x64 && $npm_execpath run compile:win-arm64",
    "compile:mac": "$npm_execpath run compile:mac-x64 && $npm_execpath run compile:mac-arm64",
    "compile:x64": "$npm_execpath run compile:linux-x64 && $npm_execpath run compile:win-x64 && $npm_execpath run compile:mac-x64",
    "compile:arm64": "$npm_execpath run compile:linux-arm64 && $npm_execpath run compile:win-arm64 && $npm_execpath run compile:mac-arm64",
    "compile:all": "$npm_execpath run build && $npm_execpath run compile:x64 && $npm_execpath run compile:arm64"
  }
}
```

You can use them to build, compile, test, lint, format, etc.

## Tech Stacks

- [Node.js](https://nodejs.org/en/) as the core
- [TypeScript](https://www.typescriptlang.org/) for type checking
- [esbuild](https://esbuild.github.io/) for bundling
- [pkg](https://www.npmjs.com/package/pkg) for compiling
- [husky](https://www.npmjs.com/package/husky) for git hooks
- [eslint](https://www.npmjs.com/package/eslint) for linting
- [prettier](https://www.npmjs.com/package/prettier) for formatting
- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) for updating dependencies
- [chalk](https://www.npmjs.com/package/chalk) for colorful console logs
- [commander.js](https://github.com/tj/commander.js) for command line interface
- [lowdb](https://github.com/typicode/lowdb) for database
- [astro](https://astro.build/) for documentation
