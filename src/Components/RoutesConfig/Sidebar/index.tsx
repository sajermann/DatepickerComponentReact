import { useHomePage } from '~/hooks/useHomePage';
import { testIdOnlyDev } from '~/utils/showInDevelopment';
import { Config } from './Config';
import { Credits } from './Credits';
import { OtherComponents } from './OtherComponents';
import { TableOfContents } from './TableOfContents';

export function _Sidebar() {
  const { isHomePage } = useHomePage();
  if (isHomePage) {
    return null;
  }
  return (
    <div className="hidden min-w-[18rem] w-72 max-w-[18rem] xl:flex">
      <aside
        {...testIdOnlyDev('aside-sidebar')}
        className="flex flex-col w-full gap-3 max-h-full sticky top-4 self-start overflow-y-auto"
      >
        <Config />
        <Credits />
        <TableOfContents />
        <OtherComponents />
      </aside>
    </div>
  );
}
