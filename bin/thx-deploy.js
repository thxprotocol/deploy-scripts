#!/usr/bin/env node

const deploy = require("../index.js");
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-3" });

const common = {
  cmd: "npm run migrate",
  launchType: "FARGATE",
  region: "eu-west-3",
};

const devCluster = {
  clusterArn:
    "arn:aws:ecs:eu-west-3:275440070213:cluster/THXSharedInfraDev-THXClusterFAED48EA-LUOExQirCMo5",
  securityGroups: ["sg-0a52a74d7ffbc4d8e"],
  subnets: ["subnet-024678e78678cad14", "subnet-020f4e7dfeeb05b8c"],
};

const tag = process.argv[3];
const app = process.argv[2];

let config = {
  ApiDev: {
    ...common,
    ...devCluster,
    serviceName: "ApiDev-apiServiceD7654F36-OkyTnA8Fg3LA",
    containerNames: ["apiContainer"],
    containerName: "apiContainer",
    image: `275440070213.dkr.ecr.eu-west-3.amazonaws.com/api:${tag}`,
  },
};

if (config[app] === undefined) {
  console.error("App %s is undefined", app);
  console.log("Available apps:", Object.keys(config));
  process.exit(1);
}
if (!tag) {
  console.error("Please specify the tag to deploy");
  process.exit(1);
}

console.log("Deploying tag %s to %s", tag, app);
deploy(config[app]);
