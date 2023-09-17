---
title: verbose
description: Core Concets - verbose
---

envshh has a `verbose` mode that can be enabled by passing the `--verbose` option to any command. This will print out additional information about what the command is doing. This is useful for debugging purposes. Not only you can see the flow, but also what shell commands are being executed what's there output and everything. So, you get a clear idea of what's going on in the background.

Verbose option has two modes and can be enabled by two ways:

- Including `--verbose` option with all of the [commands](/commands) except [help](/core-concepts/help) - This will tell you about all the steps that are being executed from the **starting of the executition of that command flow**
- providing `VERBOSE=true` environment variable - This will tell you about all the steps that are being executed from the **starting of the envshh process**. Then it will show you the steps of the command you are executing. You can do this on linux by running `VERBOSE=true npx envshh <command>` or on windows by running `set VERBOSE=true && npx envshh <command>`

