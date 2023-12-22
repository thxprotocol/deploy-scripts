#!/usr/bin/env node
const yargs = require("yargs/yargs");
const config = require("../config");
const { hideBin } = require("yargs/helpers");
const deployCommand = require("./commands/deploy");
const diffCommand = require("./commands/diff");
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-3" });

yargs(hideBin(process.argv))
  .command(
    ["deploy <app> [tag]", "$0 <app> [tag]"],
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
          describe: "Use the currently deployed dev tag as tag",
          type: "boolean",
          conflicts: "current-tag",
        })
        .option("current-tag", {
          describe: "Use to trigger a redeploy of the current tag",
          type: "boolean",
          conflicts: "mirror-dev",
        });
    },
    deployCommand
  )
  .command(
    ["diff <app>"],
    "Opens the diff for app -> main",
    (yargs) => {
      return yargs.positional("app", {
        describe: "either api, auth or discord",
        type: "string",
      });
    },
    diffCommand
  )
  .parse();
