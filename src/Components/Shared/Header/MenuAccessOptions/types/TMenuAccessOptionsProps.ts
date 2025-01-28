import { TRoutesMenu } from '~/types/TRoutesMenu';

export type TMenuAccessOptionsProps = TRoutesMenu & {
  onClick?: () => void;
};
