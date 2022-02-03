interface Environment {
  readonly account?: string;
  readonly region?: string;
}

export function getCurrentTag(
  env: Environment,
  taskDefinition: String,
  containerName: String
): Promise<String | undefined>;
