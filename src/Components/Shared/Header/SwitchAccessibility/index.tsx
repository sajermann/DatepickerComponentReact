import clsx from 'clsx';
import { useFontSize } from '~/hooks/useFontSize';
import { useTranslation } from '~/hooks/useTranslation';

export function SwitchAccessibility() {
  const { translate } = useTranslation();
  const { fontSize, increaseFont, decreaseFont, resetFont, defaultFontSize } =
    useFontSize();

  return (
    <div>
      <div>{translate('ACCESSIBILITY')}</div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className={clsx(
            'w-48 h-16 border flex items-center justify-center gap-2 p-4 rounded-l-lg',
          )}
          onClick={decreaseFont}
        >
          <div className="flex flex-col">
            <span>A-</span> <span>({fontSize - 1}px)</span>
          </div>
        </button>
        <button
          type="button"
          className={clsx(
            'w-48 h-16 border flex items-center justify-center gap-2 p-4',
          )}
          onClick={resetFont}
        >
          <div className="flex flex-col">
            <span>A</span> <span>({defaultFontSize}px)</span>
          </div>
        </button>
        <button
          type="button"
          className={clsx(
            'w-48 h-16 border flex items-center justify-center gap-2 p-4 rounded-r-lg',
          )}
          onClick={increaseFont}
        >
          <div className="flex flex-col">
            <span>A+</span> <span>({fontSize + 1}px)</span>
          </div>
        </button>
      </div>
    </div>
  );
}
