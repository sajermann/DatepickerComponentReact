import { useTranslation } from '~/hooks/useTranslation';
import { CenterContent } from './components/CenterContent';

const APPLICATION_NAME = import.meta.env.VITE_APPLICATION_NAME;

export function Home() {
  const { translate } = useTranslation();

  return (
    <main className="h-full gap-5 flex flex-col">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl">
          <strong>{`${translate('WELCOME')} - ${APPLICATION_NAME}`}</strong>
        </h1>
        <p>{translate('HOME_MESSAGE_PRESENTATION')}</p>
        <div className="flex gap-2">
          <a
            href="https://github.com/sajermann/DatepickerComponentReact/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
              alt="github"
              className="rounded-sm"
            />
          </a>
          <a
            href="https://codesandbox.io/p/github/sajermann/DatepickerComponentReact/develop"
            target="_blank"
            rel="noreferrer"
            className="bg-black rounded-sm p-2 flex gap-2 h-7 items-center text-sm font-bold"
          >
            <img
              src="https://static-00.iconduck.com/assets.00/codesandbox-icon-443x512-phs2983r.png"
              alt="codesandbox"
              className="w-3 invert"
            />
            Codesandbox
          </a>
        </div>
      </div>
      <CenterContent />
    </main>
  );
}
