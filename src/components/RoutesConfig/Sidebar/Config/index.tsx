import { SwitchLanguage } from '~/components/SwitchLanguage';
import { SwitchTheme } from '~/components/SwitchTheme';
import { useTranslation } from '~/hooks/useTranslation';

export function Config() {
  const { translate } = useTranslation();
  return (
    <main className="border rounded-2xl p-5 text-sm flex flex-col gap-2">
      <p>⚙ {translate('SETTINGS')}</p>
      <div className="flex gap-2 items-center justify-center h-12">
        <SwitchLanguage expanded />
        <SwitchTheme expanded />
      </div>
    </main>
  );
}
