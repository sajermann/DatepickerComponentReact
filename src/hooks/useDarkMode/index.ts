import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { _handleChangeDarkModeInDom } from '~/hooks/useDarkMode/utils';
import { IUseDarkModeZustand } from './interface';

const IDENTIFIER = `${import.meta.env.VITE_APPLICATION_IDENTIFIER}:darkMode`;

const safeStorage = {
  getItem: (name: string) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      localStorage.setItem(name, value);
    } catch {
      // noop in environments without localStorage
    }
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch {
      // noop in environments without localStorage
    }
  },
};

export const useDarkMode = create<IUseDarkModeZustand>()(
  persist(
    set => ({
      darkMode: true,
      toggleDarkMode: () =>
        set(state => {
          _handleChangeDarkModeInDom(!state.darkMode);
          return {
            ...state,
            darkMode: !state.darkMode,
          };
        }),
    }),
    {
      name: IDENTIFIER, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => safeStorage),
    },
  ),
);

// self-executing function (função auto-executável)
if (typeof window !== 'undefined') {
  (() => _handleChangeDarkModeInDom(useDarkMode.getState().darkMode))();
  window.store = useDarkMode;
}
