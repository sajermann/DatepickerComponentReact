import { useEffect } from 'react';
import { useLoadingLazy } from '~/Hooks/UseLoadingLazy';
import { useTranslation } from '~/Hooks/UseTranslation';

export function IsLoading() {
  const { translate } = useTranslation();
  const { setIsLoadingLazy } = useLoadingLazy();

  useEffect(() => {
    setIsLoadingLazy(true);
    return () => setIsLoadingLazy(false);
  }, []);
  return <p>{translate('LOADING')}...</p>;
}
