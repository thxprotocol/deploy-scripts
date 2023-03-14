const common = {
  cmd: "yarn migrate",
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
    "arn:aws:ecs:eu-west-3:275440070213:cluster/THXSharedInfraProd-THXClusterFAED48EA-iftJ8iirL1ep",
  securityGroups: ["sg-0b6ae953be3b223d8"],
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
    devApp: "ApiDev",
    serviceName: "ApiProd-apiServiceD7654F36-ESjPe9pEyMYC",
    taskDefinitionName: "ApiProdapiMainTaskC482A2F5",
    containerNames: ["apiContainer"],
    containerName: "apiContainer",
    repository: "275440070213.dkr.ecr.eu-west-3.amazonaws.com/api",
  },
  AuthDev: {
    ...common,
    ...devCluster,
    serviceName: "AuthDev-authService103BE8C2-z5555KU3rpu6",
    taskDefinitionName: "AuthDevauthMainTask2132FDB5",
    containerNames: ["authContainer"],
    containerName: "authContainer",
    repository: "275440070213.dkr.ecr.eu-west-3.amazonaws.com/auth",
  },
  AuthProd: {
    ...common,
    ...prodCluster,
    devApp: "AuthDev",
    serviceName: "AuthProd-authService103BE8C2-4aZWgRDE1eg0",
    taskDefinitionName: "AuthProdauthMainTask25785408",
    containerNames: ["authContainer"],
    containerName: "authContainer",
    repository: "275440070213.dkr.ecr.eu-west-3.amazonaws.com/auth",
  },
  DiscordDev: {
    ...common,
    ...devCluster,
    serviceName: "DiscordDev-discordService5C514286-Ng2OdQDlaSLo",
    taskDefinitionName: "DiscordDevdiscordMainTask99846432",
    containerNames: ["discordContainer"],
    containerName: "discordContainer",
    repository: "275440070213.dkr.ecr.eu-west-3.amazonaws.com/discord",
  },
  DiscordProd: {
    ...common,
    ...prodCluster,
    devApp: "DiscordDev",
    // serviceName: "DiscordProd-discordService103BE8C2-4aZWgRDE1eg0",
    // taskDefinitionName: "DiscordDevdiscordMainTask99846432",
    containerNames: ["discordContainer"],
    containerName: "discordContainer",
    repository: "275440070213.dkr.ecr.eu-west-3.amazonaws.com/discord",
  },
};
