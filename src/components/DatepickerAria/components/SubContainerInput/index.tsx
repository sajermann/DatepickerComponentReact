import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

const container = tv({
  slots: {
    containerPropsInternal: ['flex items-center border rounded h-11 py-1 px-2'],
  },
});

type TSubContainerInput = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export function SubContainerInput(props: TSubContainerInput) {
  const { containerPropsInternal } = container({});

  return (
    <div
      {...props}
      className={containerPropsInternal({
        class: props.className,
      })}
    />
  );
}
