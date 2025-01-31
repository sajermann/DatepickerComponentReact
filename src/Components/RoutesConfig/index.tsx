import { Suspense } from 'react';
import { useLocation } from 'react-router';

import { useRoutesMenu } from '~/hooks/useRoutesMenu';
import _Breadcrumbs from './Breadcumbs';
import { IsLoading } from './IsLoading';
import { _MountRoutes } from './MountRoutes';
import { _Sidebar } from './Sidebar';

export function RoutesConfig() {
  const { globalRoutes } = useRoutesMenu();
  const location = useLocation();

  return (
    <div className="w-full 2xl:max-w-[1330px] p-2 gap-5 flex  my-0 mx-auto">
      <div className="w-full flex flex-col h-full gap-2 flex-1">
        <Suspense key={location.key} fallback={<IsLoading />}>
          <_Breadcrumbs />
          <_MountRoutes routes={globalRoutes} />
        </Suspense>
      </div>
      <_Sidebar />
    </div>
  );
}
