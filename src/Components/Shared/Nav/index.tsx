import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

const navVariant = tv({
  base: [
    'h-16 flex items-center justify-center p-4',
    'border-b border-b-dark-400',
    'dark:bg-dark-500/70',
  ],
});

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
export function Nav({ children, className }: Props) {
  return <nav className={navVariant({ class: className })}>{children}</nav>;
}
