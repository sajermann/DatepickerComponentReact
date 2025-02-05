import { TRoutesMenu } from '~/types/TRoutesMenu';
import { TTriRoutes } from '../../types';
import { _getNext } from '../getNext';
import { _getPrev } from '../getPrev';

export function getTriRoutes(options: TRoutesMenu[], url: string) {
  const result: TTriRoutes = {
    actual: null,
    prev: null,
    next: null,
  };

  if (url === '/') {
    return result;
  }

  options.forEach((opt, indexOpt) => {
    if (opt.path === url) {
      result.actual = opt;
      result.prev = _getPrev(options, indexOpt);
      result.next = _getNext(options, indexOpt);
    }
    // TODO: Os filhos (Subs) não está ocorrendo verificação de hideTriRoutes, ou seja, se existir algum que não deveria ser mostrando, vai acabar sendo.
    if (opt.subs) {
      opt.subs.forEach((optSub, indexOptSub) => {
        if (optSub.path === url) {
          result.actual = optSub;
          result.next =
            options[indexOpt].subs?.[indexOptSub + 1] ?? options[indexOpt + 1];
          if (indexOptSub === 0) {
            result.prev = opt;
          } else {
            result.prev = options[indexOpt].subs?.[indexOptSub - 1];
          }
        }
      });
    }
  });

  return { ...result };
}
