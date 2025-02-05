import { useTranslation } from '~/hooks/useTranslation';
import { Icons } from '../Icons';

export function SwitchLanguage({ expanded }: { expanded?: boolean }) {
  const { currentLanguage, changeLanguage } = useTranslation();
  const isEnLang = currentLanguage === 'en-US';
  return (
    <button
      className="hover:opacity-70 transition-opacity duration-300 flex flex-col gap-1 items-center justify-between h-full"
      onClick={() => {
        const lang = isEnLang ? 'pt-BR' : 'en-US';
        changeLanguage(lang);
      }}
    >
      <div className="w-7">
        {isEnLang ? <Icons nameIcon="eua" /> : <Icons nameIcon="brazil" />}
      </div>
      {expanded && <p>{isEnLang ? 'English' : 'Português'}</p>}
    </button>
  );
}
