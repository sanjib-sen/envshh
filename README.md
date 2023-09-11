<p align="center">
  <a href="" rel="noopener">
 <img width=528px height=119px src="/docs/assets/white_logo.png" alt="Project logo"></a>
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

## Configuration

There are some configuration options that you can set to customize the behavior of Envshh. You can set the configuration options in the `.envshhrc` file in the project root directory. If the file does not exist, Envshh will create it for you.

## 🚀 Deployment

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using

- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## ✍️ Authors

- [@sanjib-sen](https://github.com/sanjib-sen) - Idea & Initial work

## 🎉 Acknowledgements

- Hat tip to anyone whose code was used
- Inspiration
- References
