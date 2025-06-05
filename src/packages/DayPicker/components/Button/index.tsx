import { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const buttonVariants = tv({
  slots: {
    buttonPropsInternal: [
      "py-1 px-4 w-52 h-11 border-0 font-bold flex items-center justify-center text-lg",
      "relative overflow-hidden cursor-pointer disabled:cursor-not-allowed rounded-lg",
      "outline-none",
      "active:opacity-50 focus:ring-2 hover:opacity-70",
      "disabled:opacity-50 disabled:active:opacity-50 disabled:hover:opacity-50",
      "transition-all duration-500",
    ],
  },
  variants: {
    color: {
      mono: {
        buttonPropsInternal: [
          "bg-black border border-black focus:ring-black text-white",
          "dark:bg-white dark:border-white dark:focus:ring-white dark:text-black",
        ],
      },
    },
    variant: {
      option: {
        buttonPropsInternal: [
          "bg-transparent border-0 ring-0 focus:ring-0 hover:opacity-50",
        ],
      },
    },
    iconButton: {
      rounded: {
        buttonPropsInternal: ["w-11 h-11 p-2 rounded-full"],
      },
    },
  },
  compoundSlots: [
    {
      slots: ["buttonPropsInternal"],
      color: "mono",
      variant: ["option"],
      className: "text-black dark:text-white dark:bg-transparent",
    },
  ],

  defaultVariants: {
    color: "mono",
    variant: "option",
  },
});

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "option";
  colorStyle?: "mono";
  iconButton?: "rounded";
}

function Button({ colorStyle, variant, iconButton, ...rest }: IButton) {
  const { buttonPropsInternal } = buttonVariants({
    color: colorStyle,
    variant,
    iconButton,
  });

  return (
    <button
      {...rest}
      className={buttonPropsInternal({
        className: rest.className,
      })}
    />
  );
}

export { Button };
