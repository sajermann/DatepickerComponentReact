import { useEffect } from 'react';
import { create } from 'zustand';

const URL_BASENAME = `#/${import.meta.env.VITE_URL_BASENAME}`;
const HOME_URL = [URL_BASENAME, '/', '#/', ''];

export const store = create<{
  isHomePage: boolean;
  setIsHomePage: (data: boolean) => void;
}>()(set => ({
  isHomePage: true,
  setIsHomePage: (data: boolean) =>
    set(state => ({
      ...state,
      isHomePage: data,
    })),
}));

export function useHomePage() {
  const { isHomePage, setIsHomePage } = store();
  useEffect(() => {
    if (HOME_URL.includes(location.hash)) {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [location.hash]);

  return { isHomePage };
}
