import { SwitchLanguage } from '~/components/SwitchLanguage';
import { SwitchTheme } from '~/components/SwitchTheme';
import { useHomePage } from '~/hooks/useHomePage';
import { managerClassNames } from '~/utils/managerClassNames';

export function Config() {
  const { isHomePage } = useHomePage();

  return (
    <div
      className={managerClassNames([
        'flex fixed bottom-2 right-2 flex-col gap-2 z-10 border p-4 rounded shadow-lg shadow-black/25 dark:shadow-white/25 backdrop-blur-md',
        { 'xl:hidden': !isHomePage },
      ])}
    >
      <SwitchTheme />
      <SwitchLanguage />
    </div>
  );
}
