import { TRoutesMenu } from '~/types/TRoutesMenu';

export const _sortCustomName = (a: TRoutesMenu, b: TRoutesMenu) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export const _sortCustomOrder = (a: TRoutesMenu, b: TRoutesMenu) => {
  // console.log({
  //   nameA: a.name,
  //   orderA: a.order ?? 9999999,
  //   nameB: b.name,
  //   orderB: b.order ?? 9999999,
  // });
  if ((a.order ?? 9999999) < (b.order ?? 9999999)) {
    // console.log(-1);
    return -1;
  }
  if ((a.order ?? 9999999) > (b.order ?? 9999999)) {
    // console.log(1);
    return 1;
  }
  // console.log(0);
  return 0;
};
