import { Fragment, useMemo, useRef, useState } from 'react';

import { HeaderButton } from '~/components/shared/Header/HeaderButton';
import { Icons } from '~/components/shared/Icons';
import { Input } from '~/components/shared/Input';
import { Main } from '~/components/shared/Main';
import { Nav } from '~/components/shared/Nav';
import { useRoutesMenu } from '~/hooks/useRoutesMenu';
import { useTranslation } from '~/hooks/useTranslation';
import BlockRightToLeftTransition from './BlockRightToLeftTransition';
import BoxScroll from './BoxScroll';
import { _BuildMenuWithSub } from './BuildMenuWithSub';
import { _BuildNormalOption } from './BuildNormalOption';
import { _BuildTrigger } from './BuildTrigger';

export function _MenuAccessOptions({
  onClick,
  hideHeader,
}: {
  onClick?: () => void;
  hideHeader?: boolean;
}) {
  const { translate, currentLanguage } = useTranslation();
  const [isVisibleSearch, setIsVisibleSearch] = useState(false);
  const [search, setSearch] = useState('');
  const { globalMenus } = useRoutesMenu();
  const refInputSearch = useRef<HTMLInputElement>(null);

  const mount = useMemo(() => globalMenus(search), [search, currentLanguage]);

  return (
    <Main className="backdrop-blur-md text-white">
      {!hideHeader && (
        <Nav>
          <div className="w-full flex items-center justify-between gap-2">
            <h2 className="text-xl whitespace-nowrap font-bold">Menu</h2>
            <div className="flex items-center justify-end gap-2">
              <BlockRightToLeftTransition width="9rem" show={isVisibleSearch}>
                <Input
                  ref={refInputSearch}
                  type="search"
                  placeholder={translate('SEARCH_MENU')}
                  value={search}
                  onChange={({ target }) => setSearch(target.value)}
                  className="w-36"
                />
              </BlockRightToLeftTransition>

              <HeaderButton
                onClick={() => {
                  setSearch('');
                  setIsVisibleSearch(!isVisibleSearch);
                  if (refInputSearch?.current) {
                    refInputSearch.current.focus();
                  }
                }}
              >
                {isVisibleSearch ? (
                  <Icons nameIcon="close" width="1.5rem" />
                ) : (
                  <Icons nameIcon="search" width="1.5rem" />
                )}
              </HeaderButton>
            </div>
          </div>
        </Nav>
      )}
      <BoxScroll>
        <ul>
          {mount.map(menu => {
            if (menu.subs) {
              return (
                <Fragment key={JSON.stringify(menu.subs)}>
                  <_BuildMenuWithSub onClick={onClick} {...menu} />
                </Fragment>
              );
            }
            return (
              <_BuildNormalOption key={menu.name} {...menu} onClick={onClick} />
            );
          })}
          {!mount.length && (
            <span className="h-14">{translate('NO_RESULT')}</span>
          )}
        </ul>
      </BoxScroll>
    </Main>
  );
}
