import { TRoutesMenu } from '~/types/TRoutesMenu';

export function _getNext(
  options: TRoutesMenu[],
  indexOpt: number,
): TRoutesMenu | null {
  const next = options[indexOpt + 1] || null;
  const realNext = next?.hide?.otherComponents
    ? _getNext(options, indexOpt + 1)
    : next;
  return realNext;
}
