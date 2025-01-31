import { MoonIcon, SunIcon } from 'lucide-react';
import { useDarkMode } from '~/hooks/useDarkMode';

export function SwitchTheme() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      className="hover:opacity-70 transition-opacity duration-300"
      onClick={toggleDarkMode}
    >
      {darkMode ? <MoonIcon width="1.75rem" /> : <SunIcon width="1.75rem" />}
    </button>
  );
}
