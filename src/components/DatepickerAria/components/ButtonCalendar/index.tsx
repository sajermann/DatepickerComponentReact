import { useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

import { managerClassNames } from '~/utils/managerClassNames';
import { Button } from '../Button';

interface IButton extends AriaButtonProps<'button'> {
  variant?: 'default' | 'outlined' | 'option';
  colorStyle?: 'primary' | 'secondary' | 'success' | 'warning' | 'mono';
  iconButton?: 'rounded' | 'squared';
}

function ButtonCalendar({
  colorStyle,
  variant,
  iconButton,
  children,
  ...props
}: IButton) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <Button
      iconButton="rounded"
      variant="option"
      colorStyle="mono"
      className={managerClassNames({
        // '!opacity-0 !cursor-default': isOpenSelectorMonthYear,
      })}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

export { ButtonCalendar };
