import React, { forwardRef, isValidElement, cloneElement } from 'react';

type SlotProps = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const Slot = ({ children, ...props }: SlotProps) => {
  if (isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...(children as any).props,
      ref: props.ref ?? (children as any).props.ref,
    });
  }

  return null;
};
