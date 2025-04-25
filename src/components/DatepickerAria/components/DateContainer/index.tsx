import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';
import { useDatepickerMega } from '../../hooks';

const container = tv({
  slots: {
    containerPropsInternal: ['flex items-center border rounded h-11 py-1 px-2'],
  },
});

type TDateContainerInput = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export function DateContainer(props: TDateContainerInput) {
  const { dateFieldProps, containerDateRef } = useDatepickerMega();
  const { containerPropsInternal } = container({});

  return (
    <div
      {...props}
      {...dateFieldProps}
      ref={containerDateRef}
      className={containerPropsInternal({
        class: props.className,
      })}
    />
  );
}
