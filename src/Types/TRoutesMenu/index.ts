export type TRoutesMenu = {
  name: string;
  path: string;
  description?: string;
  element: React.ReactNode;
  subs?: TRoutesMenu[];
  expandedMenu?: boolean;
  label: string;
  className?: string;
  router?: {
    index?: boolean;
  };
  hide?: {
    menu?: boolean;
    otherComponents?: boolean;
    home?: boolean;
  };
  order?: number;
};
