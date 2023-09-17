<p align="center">
  <a href="" rel="noopener">
 <img width="120px" height="130px" src="/docs/src/assets/logo_blue.png" alt="envshh"></a>
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

Read the [docs](https://envshh.js.org) for more details.

## ⛏️ Built Using

- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## ✍️ Authors

- [@sanjib-sen](https://github.com/sanjib-sen) - Idea & Initial work
