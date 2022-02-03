#!/usr/bin/env node

const deploy = require("../index.js");
const AWS = require("aws-sdk");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const config = require("../config");
const { getCurrentTag } = require("../utils/getCurrentTag");

AWS.config.update({ region: "eu-west-3" });

yargs(hideBin(process.argv))
  .command(
    "$0 <app> [tag]",
    "Update an app to the specified tag",
    (yargs) => {
      return yargs
        .positional("app", {
          describe:
            "The app to deploy to, options: " + Object.keys(config).join(", "),
          type: "string",
        })
        .positional("tag", {
          describe: "The tag to deploy",
          type: "string",
        })
        .option("mirror-dev", {
          describe:
            "When specified will use the currently deployed dev tag as tag",
          type: "boolean",
        });
    },
    async (argv) => {
      if (config[argv.app] === undefined) {
        console.error("App %s is undefined", argv.app);
        console.log("Available apps:", Object.keys(config));
        process.exit(1);
      }

      const tag = argv.mirrorDev
        ? await getCurrentTag(
            config[argv.app],
            "ApiDevapiMainTask48988888",
            "apiContainer"
          )
        : argv.tag;

      if (!tag) {
        console.error("Please specify the tag to deploy");
        process.exit(1);
      }

      console.log("Deploying tag %s to %s", tag, argv.app);
      deploy(config[argv.app], tag);
    }
  )
  .parse();
