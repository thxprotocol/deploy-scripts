const updater = require("@bugcrowd/ecs-service-image-updater");
const monitor = require("@bugcrowd/ecs-deployment-monitor");
const ecsTaskRunner = require("@bugcrowd/ecs-task-runner");
const {
  ECSClient,
  DeregisterTaskDefinitionCommand,
} = require("@aws-sdk/client-ecs");

module.exports = function (config, tag) {
  let statusCodes = {
    taskUpdate: undefined,
    taskRunner: undefined,
    deployment: undefined,
  };

  let formerTaskDefinition;

  const options = {
    ...config,
    image: `${config.repository}:${tag}`,
  };

  updater.getServiceTaskDefinition(options, (err, taskDefinition) => {
    formerTaskDefinition = taskDefinition;
  });

  updater(options, (err, taskDefinitionArn) => {
    if (err) throw err;
    console.log("Updated task definition");

    updateStatus("taskUpdate", 0);

    const ecsOptions = {
      ...options,
      taskDefinitionArn,
    };

    ecsTaskRunner(ecsOptions, function (err, stream) {
      if (err) throw err;

      stream.on("error", (err) => {
        throw err;
      });

      stream.pipe(process.stdout);

      stream.on("end", () => {
        console.log("Migration run with exitcode:", stream.logStream.exitCode);
        updateStatus("taskRunner", parseInt(stream.logStream.exitCode));
      });
    });

    let deployment = monitor(ecsOptions);
    deployment.on("error", (error) => console.log("Deployment state:", error));
    deployment.on("state", (state) => console.log("Deployment state:", state));
    deployment.on("end", () => {
      updateStatus("deployment", deployment.isFailure() ? 1 : 0);
    });
  });

  async function updateStatus(key, status) {
    statusCodes[key] = status;
    if (
      Object.values(statusCodes).filter((v) => v === undefined).length === 0
    ) {
      console.log("exitCodes", statusCodes);

      const exitCode = Object.values(statusCodes).filter((v) => v !== 0).length;

      // // If exited succesfully, deregister the previous task definition
      // if (exitCode === 0) {
      //   const client = new ECSClient({ region: options.region });
      //   const command = new DeregisterTaskDefinitionCommand({
      //     taskDefinition: formerTaskDefinition,
      //   });
      //   await client.send(command);
      // }

      process.exit(exitCode);
    }
  }
};
