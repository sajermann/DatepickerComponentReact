import { useEffect } from 'react';

type TProps<T extends Event> = {
  fn: (event: T) => void;
  target?: {
    addEventListener: (type: string, fn: (event: T) => void) => unknown;
    removeEventListener: (type: string, fn: (event: T) => void) => unknown;
  };
  type: string;
};
export function useAddEventListener<T extends Event = Event>({
  fn,
  target,
  type,
}: TProps<T>) {
  useEffect(() => {
    const eventTarget = target || window;
    eventTarget.addEventListener(type, fn as EventListener);

    return () => {
      eventTarget.removeEventListener(type, fn as EventListener);
    };
  }, [fn, target, type]);
}
