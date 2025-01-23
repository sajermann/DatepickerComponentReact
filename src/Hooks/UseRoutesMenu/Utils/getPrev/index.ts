import { TRoutesMenu } from '~/Types/TRoutesMenu';

export function _getPrev(
  options: TRoutesMenu[],
  indexOpt: number,
): TRoutesMenu | null {
  const prev = options[indexOpt - 1] || null;
  const realPrev = prev?.hideTriRoutes ? _getPrev(options, indexOpt - 1) : prev;
  return realPrev;
}
