# Deploy THX apps to ECS

This allows you to deploy apps to the ECS infra for THX.

It will:

1. Create a new task definition
2. Update the service to the new task definition
3. In parallel run a migration task using the new task definition
4. Monitor the deployment
5. Deregister the previous task definition when deployment was successful
6. Exit with a non zero exit code when any of those steps fail
