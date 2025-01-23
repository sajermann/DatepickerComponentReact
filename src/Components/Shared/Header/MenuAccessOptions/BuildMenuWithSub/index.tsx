import { Fragment } from 'react';
import { MenuCollapsible } from '../../MenuCollapsible';
import { _BuildNormalOption } from '../BuildNormalOption';
import { _BuildTrigger } from '../BuildTrigger';
import { TMenuAccessOptionsProps } from '../types';

export function _BuildMenuWithSub(menu: TMenuAccessOptionsProps) {
  if (menu.hideMenu || !menu.subs?.find(item => !item.hideMenu)) {
    return (
      <_BuildNormalOption
        // key={generateGuid()}  // Não lembro pq coloquei a key nesse cara, mas lembro que era importante
        {...menu}
      />
    );
  }

  return (
    <li>
      <MenuCollapsible
        defaultIsOpen={menu.expandedMenu}
        pathChilds={menu.subs.map(item => item.path)}
        trigger={triggerIsOpen => (
          <_BuildTrigger isOpen={triggerIsOpen} {...menu} />
        )}
      >
        <ul>
          {menu.subs.map(subMenu => (
            <Fragment key={subMenu.name}>
              <_BuildMenuWithSub onClick={menu.onClick} {...subMenu} />
            </Fragment>
          ))}
        </ul>
      </MenuCollapsible>
    </li>
  );
}
