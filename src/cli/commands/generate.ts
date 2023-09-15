import { Command } from "@commander-js/extra-typings";
import { theGenerate } from "../handlers/generate.js";

export const generateCommand = new Command();
generateCommand
  .name("generate")
  .description("Generate .env.example file")
  .option(
    "-e, --env <relative-path...>",
    "Specify input directory or file where the .env/.envs is/are located. Defaults to current directory.",
    [process.cwd()],
  )
  .option(
    "--value <value>",
    "Specify a value to replace empty values in the .env example file",
    "",
  )
  .option(
    "--suffix <suffix>",
    "Specify a suffix to put after the .env filename in place of 'example'",
    "example",
  )
  .action((options) => {
    theGenerate({
      envPath: options.env,
      value: options.value,
      suffix: options.suffix,
    });
  });
