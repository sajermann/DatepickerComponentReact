import { TRoutesMenu } from '~/Types/TRoutesMenu';

export function _getNext(
  options: TRoutesMenu[],
  indexOpt: number,
): TRoutesMenu | null {
  const next = options[indexOpt + 1] || null;
  const realNext = next?.hideTriRoutes ? _getNext(options, indexOpt + 1) : next;
  return realNext;
}
