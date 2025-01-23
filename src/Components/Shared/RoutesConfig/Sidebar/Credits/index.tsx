import { Icons } from '~/Components/Shared/Icons';
import { Main } from '../Main';

export function _Credits() {
  return (
    <Main heading="🛠 by Bruno Sajermann">
      <div className="flex gap-2 items-center justify-center">
        <a
          className="hover:text-primary-700 transition-colors duration-500"
          href="https://www.linkedin.com/in/devbrunosajermann/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-9 h-9">
            <Icons nameIcon="linkedin" />
          </div>
        </a>
        <a
          className="hover:text-primary-700 transition-colors duration-500"
          href="https://github.com/sajermann"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-9 h-9">
            <Icons nameIcon="github" />
          </div>
        </a>
      </div>
    </Main>
  );
}
