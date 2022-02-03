# Deploy THX apps to ECS

This allows you to deploy apps to the ECS infra for THX.

## Installation

run `npm install -g thxprotocol/deploy-scripts` if you've add the npm bin to your PATH you can now call `thx-deploy`!

## Authentication

Similar to CDK, see here: See here for how to set up authentication: https://docs.aws.amazon.com/cdk/v2/guide/cli.html#cli-environment.

## How to run:

```
thx-deploy <app> [tag]

Update an app to the specified tag

Positionals:
  app  The app to deploy to, options: ApiDev, ApiProd                   [string]
  tag  The tag to deploy                                                [string]

Options:
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  --mirror-dev   Use the currently deployed dev tag as tag             [boolean]
  --current-tag  Use to trigger a redeploy of the current tag          [boolean]
```

Images built in GitHub will be tagged with the branch and commit hash. Please use the commit hash (`sha-12fjask`) as much as possible as using the branch name might cause unwanted updates of your code. Whenever a container crashes or the service is auto scaled a the latest image with the tag is pulled and deployed.

For convenience --mirror-dev and --current-tag are used. If you want to deploy the current dev version to production you can run `thx-deploy ApiProd --mirror-dev`. In order to trigger a deploy without changing the tag you can run `thx-deploy ApiProd --current-tag`

### Deploying

Deploying a new version of the app will:

1. Create a new task definition with the specified tag
2. Update the service to the new task definition
3. In parallel run a migration task using the new task definition
4. Monitor the deployment
5. Deregister the previous task definition when deployment was successful
6. Exit with a non zero exit code when any of those steps fail
