---
title: Configuration
description: Configuration and Customization | envshh
---

One of the most important features of envshh is the ability to customize it to your needs.

The configuration file is located at `~/.config/.envshh/config.json` (`%USERPROFILE%\.enshh\config.json` in Windows) and is created automatically when you run any envshh [command](/commands). The config file is in JSON format and can be edited manually. The [database](/core-concepts/08-database) is also stored in the same file. So the `config.json` file will act both as a configuration file and a database. But this might be changed in the future based on user [feedback](/envshh/contribute).

The config file is divided into 2 main sections:

- [defaults](#defaults)

## defaults

Let's see an example first,

```json
{
    "defaults": {
        "branchName": "main",
        "instanceName": "personal",
        "localDirectory":
            "process.platform" === "win32"
                ? "${process.env.USERPROFILE}\\.envshh"
                : "`${process.env.HOME}/.config/.envshh",
        "envPatterns": [
            ".env",
            ".env.development",
            ".env.test",
            ".env.production",
            ".env.local",
            ".env.development.",
            ".env.test.local",
            ".env.production.local",
    ],
        "envValueQuotations": ["'", "\""],
        "ignoreFiles": ["README.md", "Readme.md", ".gitignore"],
        "branchNamePrefix": "envshh-branch-",
  },
}
```
