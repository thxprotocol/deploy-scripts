interface Environment {
  readonly account?: string;
  readonly region?: string;
}

export function getCurrentTag(
  env: Environment,
  taskDefinition: string,
  containerName: string
): Promise<string | undefined>;
