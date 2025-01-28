import { DetailedHTMLProps, HTMLAttributes, memo } from 'react';
import { managerClassNames } from '~/utils/managerClassNames';

interface CustomHeadingProps {
  title: string;
  variant: 'h1' | 'h2' | 'h3';
}

const variantClassMap: Record<CustomHeadingProps['variant'], string> = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
};

const CustomHeading = memo(({ title, variant }: CustomHeadingProps) => {
  const Tag = variant;

  return (
    <Tag data-tableofcontents="true" className={variantClassMap[variant]}>
      {title}
    </Tag>
  );
});

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  title?: string;
  variant?: 'h1' | 'h2' | 'h3';
};

export const Section = memo(
  ({ children, className, title, variant }: Props) => (
    <section
      className={managerClassNames([
        { 'flex flex-col gap-2 w-full': true },
        { [className as string]: className },
      ])}
    >
      {title && variant && <CustomHeading title={title} variant={variant} />}
      {children}
    </section>
  ),
);
