<p align="center">
  <a href="" rel="noopener">
 <img width="2284px" height="2448px" src="/docs/src/assets/logo_blue.png" alt="envshh"></a>
</p>

<h1 align="center">🤫 envshh</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

---

<p align="center"> A command line tool to securely and automatically manage, store environment variables.
    <br>
</p>

## 🧐 Quick Usage

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

Read the [docs](https://sanjib-sen.github.io/envshh/) for more details.

## Configuration

There are some configuration options that you can set to customize the behavior of Envshh. You can set the configuration options in the `.config/.envshh/db.json` file. If the file does not exist, envshh will create it for you.

## ⛏️ Built Using

- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## ✍️ Authors

- [@sanjib-sen](https://github.com/sanjib-sen) - Idea & Initial work
