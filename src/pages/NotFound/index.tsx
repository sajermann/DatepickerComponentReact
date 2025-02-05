import { EyeIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useBreadcrumbs } from '~/hooks/useBreadcrumbs';
import { useRoutesMenu } from '~/hooks/useRoutesMenu';
import { useTranslation } from '~/hooks/useTranslation';

export function NotFoundPage() {
  const [search, setSearch] = useState('');
  const { translate, currentLanguage } = useTranslation();
  const { setBreadcrumbs } = useBreadcrumbs();
  const { globalMenus } = useRoutesMenu();

  const mount = useMemo(() => globalMenus(search), [search, currentLanguage]);

  useEffect(() => {
    setTimeout(() => {
      setBreadcrumbs(prev => [
        ...prev,
        { label: translate('NOT_FOUND_PAGE'), link: undefined },
      ]);
    }, 1);
  }, []);

  return (
    <main className="flex flex-col gap-2">
      <div>{translate('NOT_FOUND_PAGE')}</div>

      <input
        className="ring-0 outline-none border rounded p-2"
        type="search"
        placeholder={translate('SEARCH_OPTIONS')}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />

      {mount.map(opt => (
        <div key={opt.name} className="border rounded flex">
          <div className="flex w-full flex-1 items-center justify-center">
            <div className="flex-1 ml-2">{opt.label}</div>
            <Link
              to={opt.path}
              className="flex flex-col flex-1 items-center justify-center gap-1 p-1 text-sm hover:text-primary-700 transition-colors duration-500"
            >
              <EyeIcon width="30px" />
              Demo
            </Link>
          </div>
        </div>
      ))}

      {!mount.length && <p>{translate('NO_RESULTS')}</p>}
    </main>
  );
}
