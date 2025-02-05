import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { TFontSizeContextType } from './types';
import { _changeDom } from './utils';

const IDENTIFIER = `${import.meta.env.VITE_APPLICATION_IDENTIFIER}:fontSize`;
const DEFAULT_FONT_SIZE = 16;

const FontSizeContext = createContext<TFontSizeContextType>(
  {} as TFontSizeContextType,
);

export function useFontSize() {
  return useContext(FontSizeContext);
}

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  useEffect(() => {
    const result = sessionStorage.getItem(IDENTIFIER);
    if (result) {
      _changeDom({
        identifier: IDENTIFIER,
        setFontSize,
        value: Number(result),
      });
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      fontSize,
      defaultFontSize: DEFAULT_FONT_SIZE,
      increaseFont: () =>
        _changeDom({
          identifier: IDENTIFIER,
          setFontSize,
          value: fontSize + 1,
        }),
      decreaseFont: () =>
        _changeDom({
          identifier: IDENTIFIER,
          setFontSize,
          value: fontSize - 1,
        }),
      resetFont: () =>
        _changeDom({
          identifier: IDENTIFIER,
          setFontSize,
          value: DEFAULT_FONT_SIZE,
        }),
    }),
    [fontSize],
  );

  return (
    <FontSizeContext.Provider value={memoizedValue}>
      {children}
    </FontSizeContext.Provider>
  );
}
