export function getEnv(...args: string[]) {
  const envToReturn: string[] = [];

  for (const arg of args) {
    envToReturn.push(import.meta.env[arg]);
  }

  return envToReturn;
}
