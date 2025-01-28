import { TRoutesMenu } from '~/types/TRoutesMenu';
import { TBreadcrumb } from '../../types';
import { _getMyChild } from '../getMyChild';

export function _getBreadcrumbs(urls: string[], options: TRoutesMenu[]) {
  const final: TBreadcrumb[] = [];
  for (const url of urls) {
    const child = _getMyChild(options, url);
    const semiFinal = {
      label: options.find(opt => opt.path === `/${url}`)?.label ?? child?.label,
      link: options.find(opt => opt.path === `/${url}`)?.path ?? child?.path,
    };
    if (semiFinal.label) {
      final.push(semiFinal);
    }
  }

  return final;
}
