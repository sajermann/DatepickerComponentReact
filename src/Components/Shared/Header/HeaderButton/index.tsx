import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { Button } from '../../Button';

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function HeaderButton({ children, ...rest }: Props) {
  return (
    <Button
      iconButton="squared"
      variant="option"
      {...rest}
      className="border border-dark-400 bg-dark-500 hover:bg-dark-400 hover:opacity-90 text-white"
    >
      {children}
    </Button>
  );
}
