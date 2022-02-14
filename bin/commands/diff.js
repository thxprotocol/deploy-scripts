const { getCurrentTag } = require("../../utils/getCurrentTag");
const config = require("../../config");
const open = require("open");

module.exports = async (argv) => {
  const app = `${argv.app[0].toUpperCase()}${argv.app.slice(1)}Prod`;
  if (config[app] === undefined) {
    console.error("App %s is undefined", app);
    console.log("Available apps:", Object.keys(config));
    process.exit(1);
  }
  const commit = await getCurrentTag(
    config[app],
    config[app].taskDefinitionName,
    config[app].containerName
  ).then((tag) => tag.slice(4));

  const url = `https://github.com/thxprotocol/${argv.app}/compare/${commit}...main`;
  console.log(`Visit ${url} to view diff between production and main`);
  open(url);
};
