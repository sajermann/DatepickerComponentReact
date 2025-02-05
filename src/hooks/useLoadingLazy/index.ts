import { create } from 'zustand';

type TUseLoadingLazyProps = {
  isLoadingLazy: boolean;
  setIsLoadingLazy: (data: boolean) => void;
};

export const useLoadingLazy = create<TUseLoadingLazyProps>()(set => ({
  isLoadingLazy: true,
  setIsLoadingLazy: (data: boolean) =>
    set(state => ({
      ...state,
      isLoadingLazy: data,
    })),
}));
window.store = useLoadingLazy;
