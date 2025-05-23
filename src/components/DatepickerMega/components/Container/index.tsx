import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useDatepickerMega } from "../../hooks";
import { Popover, PopoverAnchor } from "../Popover";

const rootContainer = tv({
  slots: {
    inputPropsInternal: [
      "group outline-none focus:ring-1 border h-11 py-1 px-2 rounded w-full bg-transparent",
      "transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50",
      "flex w-fit",
    ],
  },
  variants: {
    color: {
      primary: {
        inputPropsInternal:
          "focus:ring-blue-500 group-hover:border-blue-500 focus:border-blue-500 group-focus-within:border-blue-500",
      },
      error: {
        inputPropsInternal:
          "focus:ring-red-500 group-hover:border-red-500 focus:border-red-500 group-focus-within:border-red-500",
      },
      normal: {
        inputPropsInternal: "",
      },
    },
  },

  defaultVariants: {
    color: "normal",
  },
});

function WithoutPopover({ children }: { children: ReactNode }) {
  const { rootRef } = useDatepickerMega();
  const { inputPropsInternal } = rootContainer({
    color: "primary",
  });
  return (
    <div ref={rootRef} className={inputPropsInternal()}>
      {children}
    </div>
  );
}

export function Container({ children }: { children: ReactNode }) {
  const { isOpenCalendar } = useDatepickerMega();

  // TODO: Não está dando tempo do picker trigger ativar o hasTrigger, ai o estoura erro do radix pelo trigger não estar dentro do popover do radix
  // Então por enquando é melhor deixar o popover em tudo mesmo que não tenha o trigger
  // if (!hasTrigger) {
  // 	return <WithoutPopover>{children}</WithoutPopover>;
  // }

  return (
    <Popover open={isOpenCalendar}>
      <PopoverAnchor className="hover:cursor-default">
        <WithoutPopover>{children}</WithoutPopover>
      </PopoverAnchor>
    </Popover>
  );
}
