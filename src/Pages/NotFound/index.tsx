import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Icons } from '~/Components/Shared/Icons';

import { Input } from '~/Components/Shared/Input';
import { Main } from '~/Components/Shared/Main';
import { useBreadcrumbs } from '~/Hooks/UseBreadcrumbs';
import { useRoutesMenu } from '~/Hooks/UseRoutesMenu';
import { useTranslation } from '~/Hooks/UseTranslation';

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
    <Main>
      <div>{translate('NOT_FOUND_PAGE')}</div>

      <Input
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
              <Icons nameIcon="eye" width="30px" />
              Demo
            </Link>
          </div>
        </div>
      ))}
    </Main>
  );
}
