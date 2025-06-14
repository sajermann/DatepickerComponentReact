export function testIdOnlyDev(testid: string): object {
  if (!import.meta.env.DEV) return {};
  return { 'data-testid': testid };
}
