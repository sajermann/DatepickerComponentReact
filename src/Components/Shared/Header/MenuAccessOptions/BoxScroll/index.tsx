import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { managerClassNames } from '~/utils/managerClassNames';

export default function _BoxScroll(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) {
  return (
    <div
      {...props}
      className={managerClassNames({
        'scrollbar-thin': true,
        'scrollbar-thumb-gray-500': true,
        'scrollbar-track-gray-300': true,
        'scrollbar-thumb-rounded-full': true,
        'scrollbar-track-rounded-full': true,
        '!overflow-auto': true,
        'h-full': true,
        [props.className as string]: props.className,
      })}
    />
  );
}
