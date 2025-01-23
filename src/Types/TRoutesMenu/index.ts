export type TRoutesMenu = {
  name: string;
  path: string;
  description?: string;
  element: React.ReactNode;
  subs?: TRoutesMenu[];
  expandedMenu?: boolean;
  hideMenu?: boolean;
  label: string;
  hideTriRoutes?: boolean;
  className?: string;
  router?: {
    index?: boolean;
  };
  order?: number;
};
