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

const prodCluster = {
  clusterArn:
    "arn:aws:ecs:eu-west-3:275440070213:cluster/THXSharedInfraDev-THXClusterFAED48EA-LUOExQirCMo5",
  securityGroups: ["sg-0a52a74d7ffbc4d8e"],
  subnets: ["subnet-0c4e6407ed3de3840", "subnet-07ecbce4db555425b"],
};

module.exports = {
  ApiDev: {
    ...common,
    ...devCluster,
    serviceName: "ApiDev-apiServiceD7654F36-OkyTnA8Fg3LA",
    taskDefinitionName: "ApiDevapiMainTask48988888",
    containerNames: ["apiContainer"],
    containerName: "apiContainer",
    repository: "275440070213.dkr.ecr.eu-west-3.amazonaws.com/api",
  },
  ApiProd: {
    ...common,
    ...prodCluster,
    serviceName: "ApiDev-apiServiceD7654F36-OkyTnA8Fg3LA",
    taskDefinitionName: "ApiProdapiMainTaskC482A2F5",
    containerNames: ["apiContainer"],
    containerName: "apiContainer",
    repository: "275440070213.dkr.ecr.eu-west-3.amazonaws.com/api",
  },
};
