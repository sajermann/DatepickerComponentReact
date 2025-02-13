import { useEffect } from 'react';
import { useDatepickerMega } from '../../hooks';
import { onClickToggleAmPm } from '../../utils';

export function AmPmToggle() {
  const { setDate, onChange, setIsAmPmMode, inputAmPmRef } =
    useDatepickerMega();
  useEffect(() => {
    setIsAmPmMode(true);
  }, []);
  return (
    <input
      ref={inputAmPmRef}
      readOnly
      className="group ring-0 outline-none bg-transparent w-9 h-8 p-1 flex text-center cursor-pointer hover:text-blue-500 transition-colors duration-500 caret-transparent"
      onClick={() => {
        onClickToggleAmPm({
          setDate,
          onChange,
          amPmRef: inputAmPmRef,
        });
      }}
    />
  );
}
