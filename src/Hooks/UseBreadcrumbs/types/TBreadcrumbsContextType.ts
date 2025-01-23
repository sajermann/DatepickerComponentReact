import { Dispatch, SetStateAction } from 'react';
import { TBreadcrumb } from './TBreadcrumbs';

export type TBreadcrumbsContextType = {
  breadcrumbs: TBreadcrumb[];
  setBreadcrumbs: Dispatch<SetStateAction<TBreadcrumb[]>>;
};
