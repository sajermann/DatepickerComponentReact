export function showInDevelopment(obj: { [i: string]: string }): object {
  if (!import.meta.env.DEV) return {};
  return obj;
}
