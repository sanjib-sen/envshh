---
title: Quick Usage
description: Quick Usage | envshh
---

It is very simple and most importantly, **IT DOES NOT EVEN TAKE A MINUTE!**

## Get Started

- Create a Private Git Repo

  :::note
  The repo can be on GitHub, GitLab, Gitee, Gitea, or even your own self-hosted git server. Your .envs will be pushed to this repository. You can also use an existing repo
  :::

- Copy the Repository URL
- Go/`cd` to your Project Root where the .env's are located
- Run (With npx / pnpx / yarn dlx)

  ```sh
  npx envshh push
  ```

- When asked, provide a simple password of 4 characters or more and confirm it.

  :::note
  The password is used to encrypt the data. You will need this password to decrypt the data when you need it.
  :::

- When and if asked, paste the repo url

:::tip[Congratulations!🎉]
Congratulations! See? It was not very hard! Your .envs are encrypted and securely stored in your own repo. You can now get your .envs from any device.
:::

- Now to after any modification / deletion of your .env, or to get back the previous .env, first Go/`cd` to your project root and run

  ```sh
  npx envshh pull
  ```

- When asked, provide the password to decrypt the data

:::tip[Once Again🎉]
Congratulations! You managed to get your .envs back!
:::

## But wait, there's more!

- You can always [**push your .env updates**](/commands/push) using `npx envshh push`
- Need to [**generate a`.env.example` file?**](/commands/generate) Use `npx envshh generate`
- Need to [**pipe a .env file to stdin?**](/commands/pipe) Use `npx envshh pipe`
- Need to [**remove a .env from your repo?**](/commands/remove) Use `npx envshh remove`
