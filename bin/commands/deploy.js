const { getCurrentTag } = require("../../utils/getCurrentTag");
const deploy = require("../../index.js");
const config = require("../../config");
module.exports = async (argv) => {
  if (config[argv.app] === undefined) {
    console.error("App %s is undefined", argv.app);
    console.log("Available apps:", Object.keys(config));
    process.exit(1);
  }

  let tag = argv.tag;
  if (argv.mirrorDev) {
    devApp = config[argv.app].devApp;
    if (!devApp) {
      throw new Error(`No dev app set for ${argv.app}`);
    }
    tag = await getCurrentTag(
      config[argv.app],
      config[devApp].taskDefinitionName,
      config[devApp].containerName
    );
  } else if (argv.currentTag) {
    tag = await getCurrentTag(
      config[argv.app],
      config[argv.app].taskDefinitionName,
      config[argv.app].containerName
    );
  }

  if (!tag) {
    console.error("Please specify the tag to deploy");
    process.exit(1);
  }

  console.log("Deploying tag %s to %s", tag, argv.app);
  deploy(config[argv.app], tag);
};
