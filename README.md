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

## 🧐 Quick Usage <a name = "quick_usage"></a>

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

## 🏁 Prerequisites <a name = "prerequisites"></a>

- [git](https://git-scm.com/downloads)
  Envshh completely depends on git. Make sure you have git installed.
- [NodeJS](https://nodejs.org/en/download)
  NodeJS comes with a package manager like `npm` by default with most of the systems. Make sure you have the package manager installed by running `npm --version`. If you prefer any other package manager like `pnpm` or `yarn`, Great. Use it to install / execute Envshh commands.

### Installing

Do you know you can use Envshh without even installing? Just run `npx envshh` followed by envshh commands and you are good to go.

But if you are comfortable having it installed on your system and don't want to type `npx` all the time, you can install it

- with `npm`:
  ```
  npm install -g envshh
  ```
- with `pnpm`:
  ```
  pnpm install -g envshh
  ```
- with `yarn`:
  ```
  yarn global add envshh
  ```

## 🏁 Core Concepts <a name = "core_concepts"></a>

### project

`option: -p, --project <projectName>` Optional (default: current git repository name or current directory name)

A project is a collection of .envs or a single .env from a single project or app. If the option is not specified, Envshh will automatically detect the project name from the current git repository name. If there is no git repository, the current directory name will be the project name.

Can be used in `push`, `pull`, `remove` commands

### branch

`option: -b, --branch <branchName>` Optional (default: main)

A branch is a version of the .envs. You can have different versions of .envs for different environments like staging, production, etc. If the option is not specified, Envshh will use the default branch name `main`. You can change the default branch name in the config. See [config](#config) for more details.

Can be used in `push`, `pull`, `remove` commands

### env-path

`option: -e, --env <relative-path-of-.env-file/directory>` Optional (default: current directory)

Envshh will check for .env file patterns in the project root directory or working directory. If your .envs are not located in the project root, you can manually specify the .env file or directory where the .envs are located.

Can be used in `push`, `remove` commands. `pull` will automatically bring the .envs following the directory structure when it was pushed.
So if a .env file were pushed as `project-root/my-awesome-directory/.envs` using the env-path option, `pull` will automatically bring the .env to `project-root/my-awesome-directory/.envs`.

### offline

`option: --offline` Optional (default: false)

If you do not want to push or pull to/from the remote repository, use this option. This will only commit the .envs to the local repository in terms of `push` and get it from there in case of `pull`. You can push to remote repository later using the `push` command.

Can be used in `push`, `pull` commands

## 🔧 Commands <a name = "commands"></a>

### push

> Check `envshh push --help` or `envshh help push` for more details

Pushes and commit the .envs to the local and remote repository

`option: -i, --instance <Instance name>`

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## ✍️ Authors <a name = "authors"></a>

- [@sanjib-sen](https://github.com/sanjib-sen) - Idea & Initial work

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
