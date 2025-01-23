import { useState } from 'react';

import { Drawer } from '../../Drawer';
import { Icons } from '../../Icons';
import { HeaderButton } from '../HeaderButton';
import { _MenuAccessOptions } from '../MenuAccessOptions';

export function _MenuAccessOptionsMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeaderButton onClick={() => setIsOpen(!isOpen)}>
        <Icons nameIcon="list" width="1.5rem" />
      </HeaderButton>
      <Drawer
        openFrom="left"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sectionInternal={{
          className: 'w-96',
        }}
      >
        <_MenuAccessOptions onClick={() => setIsOpen(false)} />
      </Drawer>
    </>
  );
}
