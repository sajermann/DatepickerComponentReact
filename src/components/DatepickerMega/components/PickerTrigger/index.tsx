import { tv } from 'tailwind-variants';
import { useDatepickerMega } from '../../hooks';
import { Slot } from '../Slot';

const button = tv({
  base: 'ring-0 outline-none flex items-center justify-center h-8 p-1 hover:text-blue-500 transition-colors duration-500 cursor-pointer',
});

type RenderAsType<C extends React.ElementType> = {
  asChild?: boolean;
  as?: C;
};

type PickerTriggerProps<C extends React.ElementType = 'button'> = {
  className?: string;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
} & RenderAsType<C> &
  Omit<React.ComponentPropsWithoutRef<C>, 'className' | 'onClick'>;

export function PickerTrigger<C extends React.ElementType = 'button'>({
  asChild,
  as,
  className,
  onClick,
  ...props
}: PickerTriggerProps<C>) {
  const { setIsOpenCalendar } = useDatepickerMega({ hasTrigger: true });

  const Component = asChild ? Slot : as || 'button';

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    onClick?.(e);
    setIsOpenCalendar(true);
  };

  return (
    <Component
      type={Component === 'button' ? 'button' : undefined}
      aria-label="trigger:calendar"
      className={button({ class: className })}
      onClick={handleClick}
      {...props}
    />
  );
}
