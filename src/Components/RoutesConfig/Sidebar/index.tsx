import { testIdOnlyDev } from '~/utils/showInDevelopment';
import { _Credits } from './Credits';
import { OtherComponents } from './OtherComponents';
import { TableOfContents } from './TableOfContents';

const URL_BASENAME = `#/${import.meta.env.VITE_URL_BASENAME}`;
const HOME_URL = [URL_BASENAME, '/', '#/', ''];

export function _Sidebar() {
  if (HOME_URL.includes(location.hash)) {
    return null;
  }
  return (
    <div className="hidden min-w-[18rem] w-72 max-w-[18rem] xl:flex">
      <aside
        {...testIdOnlyDev('aside-sidebar')}
        className="flex flex-col w-full gap-3 max-h-full sticky top-20 self-start overflow-y-auto"
      >
        <TableOfContents />
        <OtherComponents />
        <_Credits />
      </aside>
    </div>
  );
}
