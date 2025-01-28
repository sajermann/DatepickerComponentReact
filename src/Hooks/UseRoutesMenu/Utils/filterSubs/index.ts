import { TRoutesMenu } from '~/types/TRoutesMenu';

export function _filterSubs(
  menu: TRoutesMenu,
  valueFilter: string,
): TRoutesMenu[] | null {
  const newOptions: TRoutesMenu[] = [];
  if (!menu.subs) return null;
  for (const subs of menu.subs) {
    const result = subs.label.toLowerCase().indexOf(valueFilter) > -1;
    if (result) {
      newOptions.push(subs);
    }

    if (subs.subs) {
      const t = _filterSubs(subs, valueFilter);
      if (t) newOptions.push(...t);
    }
  }
  return newOptions;
}
