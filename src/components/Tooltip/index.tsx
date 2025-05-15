import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ReactNode } from "react";
import { managerClassNames } from "~/utils/managerClassNames";

type TProps = {
  children: ReactNode;
};
export function Tooltip({ children }: TProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={300}>
        <TooltipPrimitive.Trigger asChild>
          <div className="w-7 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="dark:text-white text-black"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
          </div>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={managerClassNames([
              "shadow-lg shadow-black/25 dark:shadow-white/25 p-1 border",
              "select-none rounded bg-transparent backdrop-blur-md px-[15px]",
              "py-2.5 text-[15px] leading-none text-violet11 max-w-96",
              "will-change-[transform,opacity]",
              "data-[state=delayed-open]:animate-enter",
              "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
              "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade",
              "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
              "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
            ])}
            sideOffset={5}
          >
            {children}
            <TooltipPrimitive.Arrow className="fill-white" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
