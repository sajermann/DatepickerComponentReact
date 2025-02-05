import { useEffect } from 'react';
import { useDatepickerMega } from '../../hooks';
import { onClickToggleAmPm } from '../../utils';

export function AmPmToggle() {
  const { setDate, onChange, date, setIsAmPmMode } = useDatepickerMega();
  useEffect(() => {
    setIsAmPmMode(true);
  }, []);

  return (
    <input
      readOnly
      className="group ring-0 outline-none bg-transparent w-9 h-8 p-1 flex text-center cursor-pointer hover:text-blue-500 transition-colors duration-500"
      onClick={() => {
        onClickToggleAmPm({
          setDate,
          onChange,
        });
      }}
      value={date.current.clockType?.toString().toUpperCase()}
    />
  );
}
