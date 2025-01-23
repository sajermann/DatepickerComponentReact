import { TRoutesMenu } from '~/Types/TRoutesMenu';

export type TTriRoutes = {
  actual?: TRoutesMenu | null;
  prev?: TRoutesMenu | null;
  next?: TRoutesMenu | null;
};
