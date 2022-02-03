const {
  DescribeTaskDefinitionCommand,
  ECSClient,
} = require("@aws-sdk/client-ecs");

module.exports = getCurrentTag = async (env, taskDefinition, containerName) => {
  const client = new ECSClient(env);

  const command = new DescribeTaskDefinitionCommand({
    taskDefinition,
  });
  const response = await client.send(command);

  return response?.taskDefinition?.containerDefinitions
    .find((container) => container.name == containerName)
    ?.image.split(":")[1];
};
