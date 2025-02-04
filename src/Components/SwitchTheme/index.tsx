import { MoonIcon, SunIcon } from 'lucide-react';
import { useDarkMode } from '~/hooks/useDarkMode';
import { useTranslation } from '~/hooks/useTranslation';

export function SwitchTheme({ expanded }: { expanded?: boolean }) {
  const { translate } = useTranslation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      className="hover:opacity-70 transition-opacity duration-300 flex flex-col gap-1 items-center justify-between h-full"
      onClick={toggleDarkMode}
    >
      {darkMode ? <MoonIcon width="1.75rem" /> : <SunIcon width="1.75rem" />}

      {expanded && (
        <p>{darkMode ? translate('DARK_THEME') : translate('LIGHT_THEME')}</p>
      )}
    </button>
  );
}
