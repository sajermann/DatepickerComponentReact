import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useLoadingLazy } from '~/hooks/useLoadingLazy';
import { useTranslation } from '~/hooks/useTranslation';
import { useWindow } from '~/hooks/useWindow';
import { managerClassNames } from '~/utils/managerClassNames';

type TMenu = {
  type: string;
  title: string;
  anchor: string;
  top: number;
  active: boolean;
};

export function TableOfContents() {
  const { isLoadingLazy } = useLoadingLazy();
  const [optionsMenu, setOptionsMenu] = useState<TMenu[]>([]);
  const location = useLocation();
  const { scrollPosition } = useWindow();
  const { translate, currentLanguage } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView();
  };

  function load() {
    if (isLoadingLazy) return;

    const menus: TMenu[] = [];
    const subs = document.querySelectorAll('[data-tableofcontents="true"]');

    for (let i = 0; i < subs.length; i += 1) {
      menus.push({
        type: subs[i].nodeName,
        title: subs[i].textContent || '',
        anchor: `${i}-${subs[i].nodeName}-${subs[i].textContent}`,
        top: subs[i].getBoundingClientRect().top,
        active: false,
      });
      subs[i].setAttribute(
        'id',
        `${i}-${subs[i].nodeName}-${subs[i].textContent}`,
      );
    }

    const goal = 72; /* Height Header */

    if (menus.length === 0) return;
    const closest = menus.reduce((prev, curr) =>
      Math.abs(curr.top - goal) < Math.abs(prev.top - goal) ? curr : prev,
    );
    const menusWithActive = menus.map(item => {
      if (item.anchor === closest.anchor) {
        return { ...item, active: true };
      }
      return item;
    });

    setOptionsMenu([...menusWithActive]);
  }

  useEffect(
    () => load(),
    [scrollPosition, location.pathname, currentLanguage, isLoadingLazy],
  );

  if (!optionsMenu.length) {
    return null;
  }

  return (
    <main className="border rounded-2xl p-5 text-sm flex flex-col gap-2">
      <p>{translate('TABLE_OF_CONTENTS')}</p>
      <nav>
        <ul>
          {optionsMenu.map(item => (
            <li
              key={`#${item.anchor}`}
              className={managerClassNames([
                'hover:opacity-70 transition-opacity duration-300',
                {
                  'pl-6': item.type === 'H2',
                  'pl-12': item.type === 'H3',
                },
              ])}
            >
              <button
                className={managerClassNames({
                  '!text-primary-700 border-l-4 border-primary-700 pl-1':
                    item.active,
                })}
                onClick={() => scrollToSection(item.anchor)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
