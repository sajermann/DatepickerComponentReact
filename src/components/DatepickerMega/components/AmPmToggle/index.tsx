import { useEffect } from 'react';
import { useDatepickerMega } from '../../hooks';
import { useButtonAmPmProps } from '../../hooks/useButtonAmPmProps';

export function AmPmToggle() {
  const { setIsAmPmMode } = useDatepickerMega();
  const props = useButtonAmPmProps();
  useEffect(() => {
    setIsAmPmMode(true);
  }, []);
  return (
    <input
      readOnly
      className="group ring-0 outline-none bg-transparent w-9 h-8 p-1 flex text-center cursor-pointer hover:text-blue-500 transition-colors duration-500 caret-transparent"
      {...props}
    />
  );
}
