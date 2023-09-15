import { spawnSync } from "child_process";
import { Command } from "@commander-js/extra-typings";
import { readEnvByLine } from "../../envshh/functions/common.js";
import { getAllEnvsFromEnvPath } from "../../envshh/functions/get.js";
import { log } from "../../utils/log.js";
import { envPathOption } from "./common/options.js";

export const pipeCommand = new Command();
pipeCommand
  .name("pipe")
  .description("Load .env files directly and run command")
  .argument("<commands...>", "Commands to run")
  .addOption(envPathOption)
  .action((args, options) => {
    const files = getAllEnvsFromEnvPath(options.env.split(","));
    files.map((file) => {
      const linesFromFile = readEnvByLine(file);
      linesFromFile.map((line) => {
        const key = line.substring(0, line.indexOf("=")).trim();
        const value = line.substring(line.indexOf("=") + 1).trim();
        process.env[key] = value;
      });
    });
    log.info(
      `.env variables are piped to stdin. Now running: ${args.join(" ")}`,
    );
    spawnSync(args[0], args.slice(1), { stdio: "inherit" });
  });
