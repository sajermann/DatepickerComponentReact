import { useEffect } from 'react';
import { useLoadingLazy } from '~/hooks/useLoadingLazy';
import { useTranslation } from '~/hooks/useTranslation';

export function IsLoading() {
  const { translate } = useTranslation();
  const { setIsLoadingLazy } = useLoadingLazy();

  useEffect(() => {
    setIsLoadingLazy(true);
    return () => setIsLoadingLazy(false);
  }, []);
  return <p>{translate('LOADING')}...</p>;
}
