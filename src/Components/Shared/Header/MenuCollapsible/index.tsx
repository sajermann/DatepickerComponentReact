import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

import { clsx } from 'clsx';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

interface CollapsibleProps {
  defaultIsOpen?: boolean;
  pathChilds?: string[];

  children: React.ReactNode;
  trigger: (data: boolean) => React.ReactNode;
}

export function MenuCollapsible({
  pathChilds,
  children,
  trigger,
  defaultIsOpen,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    if (defaultIsOpen) {
      setIsOpen(defaultIsOpen);
      return;
    }
    setIsOpen(pathChilds?.includes(location.pathname) || false);
  }, []);

  return (
    <CollapsiblePrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <CollapsiblePrimitive.Trigger
        className={clsx({
          'w-full flex': true,
        })}
      >
        {trigger(isOpen)}
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className="flex flex-col">
        {children}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}
