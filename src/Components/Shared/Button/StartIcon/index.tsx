import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { showInDevelopment } from '~/utils/showInDevelopment';

type IStartIcon = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export default function _StartIcon({ ...rest }: IStartIcon) {
  if (rest.children) {
    return (
      <div {...showInDevelopment({ 'data-content': 'startIcon' })} {...rest} />
    );
  }
  return null;
}
