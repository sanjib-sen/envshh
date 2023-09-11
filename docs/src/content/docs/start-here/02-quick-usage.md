---
title: Quick Usage
description: A quick guide to use envshh.
---

- Create a Private Git Repo (It can be on GitHub, GitLab, or even your own self-hosted git server), copy the Repository URL.
- Go/`cd` to your Project Root where the .env's are located.
- Run (With npx / pnpx / yarn dlx)

  ```sh
  npx envshh push
  ```

- When asked, provide a simple password to encrypt the data

Congratulations! Your .envs are encrypted and securely stored in your own repo. You can now get your .envs from any device.

- Now to after any modification / deletion of your .env, or to get back the previous .env, first Go/`cd` to your project root and run

  ```sh
  npx envshh pull
  ```

- When asked, provide the password to decrypt the data

- (More) You can always **push your .env updates** using `npx envshh push`
- (More) Need to **generate a`.env.example` file?** Use `npx envshh generate`
- (More) Need to **remove a .env from your repo?** Use `npx envshh remove`
