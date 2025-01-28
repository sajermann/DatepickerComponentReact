import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { managerClassNames } from '~/utils/managerClassNames';
import { managerOverflowBody } from './Utils';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  openFrom: 'left' | 'right' | 'bottom' | 'top';
  disableBackdrop?: boolean;
  disableEsc?: boolean;
  disableClickOnBackdrop?: boolean;
  oneClickToClose?: boolean;
  sectionInternal?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
};

export function Drawer({
  children,
  openFrom,
  isOpen,
  onClose,
  disableBackdrop,
  disableEsc,
  disableClickOnBackdrop,
  oneClickToClose,
  sectionInternal,
}: Props) {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const [inDom, setIInDom] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    managerOverflowBody(isOpen, document.querySelector('body'));
    if (timer) {
      clearTimeout(timer);
    }
    if (isOpen) {
      setIInDom(isOpen);
      const resultTimer = setTimeout(() => {
        setIsOpenInternal(isOpen);
      }, 10);
      setTimer(resultTimer);
    } else {
      setIsOpenInternal(isOpen);
      const resultTimer = setTimeout(() => {
        setIInDom(isOpen);
      }, 501);
      setTimer(resultTimer);
    }
  }, [isOpen]);

  const handleClose = useCallback((esc: boolean) => {
    if ((esc && !disableEsc) || (!esc && !disableClickOnBackdrop)) {
      onClose();
    }
  }, []);

  useEffect(() => {
    const handleEsc = (event: { keyCode: number }) => {
      if (event.keyCode === 27) {
        handleClose(true);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (!inDom) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className={managerClassNames([
          { 'opacity-0 transition-opacity duration-500': true },
          { 'inset-0 fixed z-[9999]': true },
          { 'opacity-50 ': isOpenInternal },
          { 'bg-black': !disableBackdrop },
        ])}
        role="presentation"
        onClick={() => handleClose(false)}
      />
      <div
        className={managerClassNames([
          { 'fixed inset-0 transition-all duration-500 z-[9999]': true },
          { 'shadow-lg shadow-black/25 dark:shadow-white/25': true },
          // Left
          { '-translate-x-full': !isOpenInternal && openFrom === 'left' },
          // Right
          { 'left-auto': openFrom === 'right' },
          { 'translate-x-full': !isOpenInternal && openFrom === 'right' },
          // Bottom
          { 'translate-y-full': !isOpenInternal && openFrom === 'bottom' },
          // Top
          { '-translate-y-full': !isOpenInternal && openFrom === 'top' },
          {
            [sectionInternal?.className as string]: sectionInternal?.className,
          },
        ])}
        role="presentation"
        onClick={oneClickToClose ? () => onClose() : () => null}
      >
        {children}
      </div>
    </>,
    document.body,
  );
}
