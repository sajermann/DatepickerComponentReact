import { useTranslation } from '~/hooks/useTranslation';
import { Icons } from '../../Icons';

export function SwitchLanguage() {
  const { currentLanguage, changeLanguage } = useTranslation();
  const isEnLang = currentLanguage === 'en-US';
  return (
    <button
      className="hover:opacity-70 transition-opacity duration-300"
      onClick={() => {
        const lang = isEnLang ? 'pt-BR' : 'en-US';
        changeLanguage(lang);
      }}
    >
      <div className="w-7">
        {isEnLang ? <Icons nameIcon="eua" /> : <Icons nameIcon="brazil" />}
      </div>
    </button>
  );
}
