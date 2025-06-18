import { DetailedHTMLProps, HTMLAttributes, memo } from 'react';
import { tv } from 'tailwind-variants';
import { managerClassNames } from '~/utils/managerClassNames';

const section = tv({
  base: ['flex flex-col gap-2 w-full'],
});

interface CustomHeadingProps {
  title: string;
  variant: 'h1' | 'h2' | 'h3';
}

const variantClassMap: Record<CustomHeadingProps['variant'], string> = {
  h1: 'text-3xl w-fit',
  h2: 'text-2xl w-fit',
  h3: 'text-xl w-fit',
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
      className={section({ className })}
      // className={managerClassNames([
      //   'flex flex-col gap-2 w-full',
      //   { [className as string]: className },
      // ])}
    >
      {title && variant && <CustomHeading title={title} variant={variant} />}
      {children && children}
    </section>
  ),
);
