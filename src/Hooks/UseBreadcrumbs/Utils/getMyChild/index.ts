import { TRoutesMenu } from '~/Types/TRoutesMenu';

export function _getMyChild(
  routes: TRoutesMenu[],
  path: string,
): TRoutesMenu | null {
  for (const route of routes) {
    const result = route.subs?.find(obj => obj.path.includes(`/${path}`));
    if (result) {
      return result;
    }
    if (!result && route.subs) {
      const resultFock = _getMyChild(route.subs, path);
      return resultFock;
    }
  }
  return null;
}
