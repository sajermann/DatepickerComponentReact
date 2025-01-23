import { TRoutesMenu } from '~/Types/TRoutesMenu';

export type TMenuAccessOptionsProps = TRoutesMenu & {
  onClick?: () => void;
};
