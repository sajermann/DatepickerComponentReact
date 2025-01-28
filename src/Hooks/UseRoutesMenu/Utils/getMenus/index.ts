import { TRoutesMenu } from '~/types/TRoutesMenu';
import { _filterSubs } from '../filterSubs';

export function _getMenus(globalRoutes: TRoutesMenu[], search: string) {
  const valueFilter = search.toLowerCase();
  if (valueFilter === '') return globalRoutes;

  const newOptions: TRoutesMenu[] = [];
  const optionsWithChild: TRoutesMenu[] = [];

  for (const menu of globalRoutes) {
    if (menu.label.toLowerCase().indexOf(valueFilter) > -1) {
      newOptions.push(menu);
    }
    if (menu.subs) {
      const result = _filterSubs(menu, valueFilter);
      if (result) {
        newOptions.push(...result);
      }
    }
  }

  // remove childs
  for (const opt of newOptions) {
    const temp = { ...opt };
    if (temp.subs) {
      delete temp.subs;
    }
    optionsWithChild.push(temp);
  }
  return optionsWithChild;
}
