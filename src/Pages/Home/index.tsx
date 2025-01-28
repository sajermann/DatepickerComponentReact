import { Link } from 'react-router';

import { Icons } from '~/components/shared/Icons';
import { Main } from '~/components/shared/Main';

import { useRoutesMenu } from '~/hooks/useRoutesMenu';
import { useTranslation } from '~/hooks/useTranslation';
import { managerClassNames } from '~/utils/managerClassNames';

export function Home() {
  const { translate } = useTranslation();
  const { globalRoutes: options } = useRoutesMenu();

  return (
    <Main>
      <div className="flex flex-col items-center justify-center gap-2">
        <p>
          <strong>{translate('WELCOME')}</strong>
        </p>
        <p>{translate('HOME_MESSAGE_PRESENTATION')}</p>
        <a
          href="https://github.com/sajermann/MyImplementationsInReact/"
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

      <div className="grid grid-cols-12 gap-2">
        {options.map(
          opt =>
            opt.name !== 'Home' &&
            opt.name !== 'NotFound' && (
              <div
                key={opt.path}
                className={managerClassNames([
                  { 'flex flex-col border border-solid': true },
                  { 'w-full h-80 dark:border-white text-xl ': true },
                  { 'overflow-auto rounded-2xl': true },
                  {
                    'col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3': true,
                  },
                  { [opt.className as string]: opt.className },
                ])}
              >
                <header className="border-b-2 p-2 flex justify-center items-center bg-dark-500 rounded-t-2xl text-white">
                  {opt.name}
                </header>

                <main className="w-full p-2 flex items-center justify-center flex-1 m-auto">
                  {opt.description}
                </main>

                <footer className="border-t-2 flex bg-dark-500">
                  <Link
                    to={opt.path}
                    className={managerClassNames([
                      { 'flex flex-col flex-1 items-center': true },
                      { 'justify-center gap-1 p-1 text-sm': true },
                      { 'text-white duration-500 transition-colors': true },
                      { 'hover:text-primary-700 ': true },
                    ])}
                  >
                    <Icons nameIcon="eye" width="30px" />
                    Demo
                  </Link>
                </footer>
              </div>
            ),
        )}
      </div>
    </Main>
  );
}
