import clsx from 'clsx';
import { useTranslation } from '~/Hooks/UseTranslation';
import { Icons } from '../../Icons';

export function SwitchLanguage() {
  const { translate, currentLanguage, changeLanguage } = useTranslation();
  return (
    <div>
      <div>{translate('LANGUAGE')}</div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className={clsx(
            'w-48 h-16 border flex items-center justify-center gap-2 p-4 rounded-l-lg',
            {
              'border-violet-700': currentLanguage === 'en-US',
            },
          )}
          onClick={
            currentLanguage !== 'en-US'
              ? () => changeLanguage('en-US')
              : undefined
          }
        >
          <div className="w-10">
            <Icons nameIcon="eua" />
          </div>
          {translate('ENGLISH')}
        </button>
        <button
          type="button"
          className={clsx(
            'w-48 h-16 border flex items-center justify-center gap-2 p-4 rounded-r-lg',
            {
              'border-violet-700': currentLanguage === 'pt-BR',
            },
          )}
          onClick={
            currentLanguage !== 'pt-BR'
              ? () => changeLanguage('pt-BR')
              : undefined
          }
        >
          <div className="w-10">
            <Icons nameIcon="brazil" />
          </div>
          {translate('PORTUGUESE')}
        </button>
      </div>
    </div>
  );
}
