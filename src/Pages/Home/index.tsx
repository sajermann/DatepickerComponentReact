import { EyeIcon } from 'lucide-react';
import { Link } from 'react-router';
import { useRoutesMenu } from '~/hooks/useRoutesMenu';
import { useTranslation } from '~/hooks/useTranslation';
import { managerClassNames } from '~/utils/managerClassNames';
const APPLICATION_NAME = import.meta.env.VITE_APPLICATION_NAME;

export function Home() {
  const { translate } = useTranslation();
  const { globalRoutes: options } = useRoutesMenu();

  return (
    <main className="h-full gap-5 flex flex-col">
      <div className="flex flex-col items-center justify-center gap-2">
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

      <div className="flex flex-wrap items-center justify-center gap-2">
        {options.map(
          opt =>
            opt.name !== 'Home' &&
            opt.name !== 'NotFound' && (
              <div
                key={opt.path}
                className={managerClassNames([
                  { 'flex flex-col border border-solid': true },
                  { 'dark:border-white text-xl ': true },
                  { 'overflow-auto rounded-2xl w-64': true },
                  { [opt.className as string]: opt.className },
                ])}
              >
                <header className="h-16 p-2 flex justify-center items-center bg-dark-500 rounded-t-2xl text-white">
                  {opt.name}
                </header>

                <footer className="h-16  flex items-center justify-center bg-dark-500">
                  <Link
                    to={opt.path}
                    className={managerClassNames([
                      { 'flex flex-col items-center': true },
                      { 'justify-center gap-1 p-1 text-sm': true },
                      { 'text-white duration-500 transition-colors': true },
                      { 'hover:text-primary-700 ': true },
                    ])}
                  >
                    <EyeIcon width="30px" />
                    Demo
                  </Link>
                </footer>
              </div>
            ),
        )}
      </div>
    </main>
  );
}
