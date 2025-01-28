/* eslint-disable react/button-has-type */
import { AllHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { TFeedbackProps } from '~/components/shared/Input/Types/TFeedbackProps';
import { showInDevelopment } from '~/utils/showInDevelopment';
import Children from './Children';
import EndIcon from './EndIcon';
import FeedbackIcon from './FeedbackIcon';
import LoadingIcon from './LoadingIcon';
import MainFeedback from './MainFeedback';
import StartIcon from './StartIcon';

const buttonVariants = tv({
  slots: {
    buttonPropsInternal: [
      'py-1 px-4 w-52 h-11 border-0 font-bold flex items-center justify-center text-lg',
      'relative overflow-hidden cursor-pointer disabled:cursor-not-allowed rounded-lg',
      'outline-none',
      'active:opacity-50 focus:ring-2 hover:opacity-70',
      'disabled:opacity-50 disabled:active:opacity-50 disabled:hover:opacity-50',
      'transition-all duration-500',
    ],
    containerInsideInternal: [
      'flex items-center justify-center w-full h-full gap-1',
    ],
    containerIconInternal: ['h-full'],
    containerChildrenInternal: [
      'w-full overflow-hidden whitespace-nowrap text-ellipsis flex-1',
    ],
  },
  variants: {
    color: {
      primary: {
        buttonPropsInternal: [
          'bg-blue-500 border border-blue-700 focus:ring-blue-700 text-white',
        ],
      },
      secondary: {
        buttonPropsInternal: [
          'bg-red-500 border border-red-700 focus:ring-red-700 text-white',
        ],
      },
      success: {
        buttonPropsInternal: [
          'bg-green-500 border border-green-700 focus:ring-green-700 text-white',
        ],
      },
      warning: {
        buttonPropsInternal: [
          'bg-yellow-500 border border-yellow-700 focus:ring-yellow-700 text-white',
        ],
      },
      mono: {
        buttonPropsInternal: [
          'bg-black border border-black focus:ring-black text-white',
          'dark:bg-white dark:border-white dark:focus:ring-white dark:text-black',
        ],
      },
    },
    variant: {
      default: {
        buttonPropsInternal: [''],
      },
      outlined: {
        buttonPropsInternal: ['bg-transparent'],
      },
      option: {
        buttonPropsInternal: [
          'bg-transparent border-0 ring-0 focus:ring-0 hover:opacity-50',
        ],
      },
    },
    iconButton: {
      rounded: {
        buttonPropsInternal: ['w-11 h-11 p-2 rounded-full'],
      },
      squared: {
        buttonPropsInternal: ['w-11 h-11 p-2'],
      },
    },
  },
  compoundSlots: [
    {
      slots: ['buttonPropsInternal'],
      color: 'primary',
      variant: ['outlined', 'option'],
      className: 'text-blue-500',
    },
    {
      slots: ['buttonPropsInternal'],
      color: 'secondary',
      variant: ['outlined', 'option'],
      className: 'text-red-500',
    },
    {
      slots: ['buttonPropsInternal'],
      color: 'success',
      variant: ['outlined', 'option'],
      className: 'text-green-500',
    },
    {
      slots: ['buttonPropsInternal'],
      color: 'warning',
      variant: ['outlined', 'option'],
      className: 'text-yellow-500',
    },
    {
      slots: ['buttonPropsInternal'],
      color: 'mono',
      variant: ['outlined', 'option'],
      className: 'text-black dark:text-white dark:bg-transparent',
    },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'default',
  },
});

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  containerIconsProps?: AllHTMLAttributes<HTMLDivElement>;
  containerInsideProps?: AllHTMLAttributes<HTMLDivElement>;
  containerChildrenProps?: AllHTMLAttributes<HTMLDivElement>;
  withFeedback?: TFeedbackProps;
  variant?: 'default' | 'outlined' | 'option';
  colorStyle?: 'primary' | 'secondary' | 'success' | 'warning' | 'mono';
  iconButton?: 'rounded' | 'squared';
  type?: 'submit' | 'reset' | 'button';
}

function Button({
  withFeedback,
  children,
  startIcon,
  endIcon,
  containerIconsProps,
  containerInsideProps,
  containerChildrenProps,
  colorStyle,
  variant,
  iconButton,
  ...rest
}: IButton) {
  const {
    buttonPropsInternal,
    containerInsideInternal,
    containerIconInternal,
    containerChildrenInternal,
  } = buttonVariants({
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
    >
      <div
        {...showInDevelopment({ 'data-content': 'containerInsideButton' })}
        {...containerInsideProps}
        className={containerInsideInternal({
          className: containerInsideProps?.className,
        })}
      >
        <StartIcon
          className={containerIconInternal({
            className: containerIconsProps?.className,
          })}
        >
          {startIcon}
        </StartIcon>
        <Children
          withFeedback={withFeedback}
          className={containerChildrenInternal({
            className: [
              containerChildrenProps?.className,
              iconButton ? 'flex justify-center' : '',
            ],
          })}
        >
          {children}
        </Children>
        <MainFeedback
          withFeedback={withFeedback}
          className={containerIconInternal({
            className: containerIconsProps?.className,
          })}
        >
          <LoadingIcon withFeedback={withFeedback} />
          <FeedbackIcon withFeedback={withFeedback} />
        </MainFeedback>
        <EndIcon
          withFeedback={withFeedback}
          className={containerIconInternal({
            className: containerIconsProps?.className,
          })}
        >
          {endIcon}
        </EndIcon>
      </div>
    </button>
  );
}

export { Button };
