import { TRoutesMenu } from '~/types/TRoutesMenu';

export type TTriRoutes = {
  actual?: TRoutesMenu | null;
  prev?: TRoutesMenu | null;
  next?: TRoutesMenu | null;
};
