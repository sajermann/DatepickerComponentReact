import { useTranslation } from '~/hooks/useTranslation';
import { CenterContent } from './components/CenterContent';

const APPLICATION_NAME = import.meta.env.VITE_APPLICATION_NAME;

export function Home() {
  const { translate } = useTranslation();

  return (
    <main className="h-full gap-5 flex flex-col">
      <div className="flex flex-col items-center justify-center gap-2">
        arrumar o tamanho do main, no mobile colocar um padd pequeno e arrumar
        barra rolagem
        <p>
          <strong>{`${translate('WELCOME')} - ${APPLICATION_NAME}`}</strong>
        </p>
        <p>{translate('HOME_MESSAGE_PRESENTATION')}</p>
        <a
          href="https://github.com/sajermann/DatepickerComponentReact/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
            alt="github"
            height="18"
            style={{ borderRadius: 5, marginRight: 5 }}
          />
        </a>
      </div>
      <CenterContent />
    </main>
  );
}
