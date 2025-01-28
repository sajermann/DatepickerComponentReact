import { Icons } from '~/components/shared/Icons';
import { useDarkModeZustand } from '~/hooks/useDarkMode';
import { useTranslation } from '~/hooks/useTranslation';
import { managerClassNames } from '~/utils/managerClassNames';

export function SwitchTheme() {
  const { darkMode, toggleDarkMode } = useDarkModeZustand();
  const { translate } = useTranslation();
  return (
    <div>
      <div>{translate('THEME')}</div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className={managerClassNames(
            'h-16 border flex items-center justify-center gap-2 p-4 rounded-l-lg',
            {
              'border-violet-700': darkMode,
            },
          )}
          onClick={!darkMode ? toggleDarkMode : undefined}
        >
          <Icons nameIcon="moon" />
          {translate('DARK')}
        </button>
        <button
          type="button"
          className={managerClassNames(
            'h-16 border flex items-center justify-center gap-2 p-4 rounded-r-lg',
            {
              'border-violet-700 cursor-pointer': !darkMode,
            },
          )}
          onClick={darkMode ? toggleDarkMode : undefined}
        >
          <Icons nameIcon="sun" />
          {translate('LIGHT')}
        </button>
      </div>
    </div>
  );
}
