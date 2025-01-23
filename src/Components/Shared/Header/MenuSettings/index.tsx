import { useState } from 'react';

import { Drawer } from '~/Components/Shared/Drawer';
import { HeaderButton } from '~/Components/Shared/Header/HeaderButton';
import { SwitchLanguage } from '~/Components/Shared/Header/SwitchLanguage';
import { SwitchTheme } from '~/Components/Shared/Header/SwitchTheme';
import { Icons } from '~/Components/Shared/Icons';
import { Main } from '~/Components/Shared/Main';
import { Nav } from '~/Components/Shared/Nav';
import { useTranslation } from '~/Hooks/UseTranslation';
import { Button } from '../../Button';
import { SwitchAccessibility } from '../SwitchAccessibility';

export default function _MenuSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { translate } = useTranslation();

  return (
    <>
      <HeaderButton onClick={() => setIsOpen(!isOpen)}>
        <Icons nameIcon="gear" width="1.5rem" />
      </HeaderButton>

      <Drawer
        openFrom="right"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sectionInternal={{
          className: 'w-96',
        }}
      >
        <Main className="backdrop-blur-md text-white">
          <Nav className="flex justify-between w-full">
            <h2 className="text-xl whitespace-nowrap font-bold">
              {translate('SETTINGS')}
            </h2>
            <Button
              iconButton="rounded"
              variant="option"
              onClick={() => setIsOpen(false)}
              data-testid="closeButtonModal"
              className="text-white"
            >
              <Icons nameIcon="close" width="1rem" />
            </Button>
          </Nav>
          <div className="flex flex-col p-4 gap-4">
            <SwitchTheme />

            <SwitchLanguage />
            <SwitchAccessibility />
          </div>
        </Main>
      </Drawer>
    </>
  );
}
