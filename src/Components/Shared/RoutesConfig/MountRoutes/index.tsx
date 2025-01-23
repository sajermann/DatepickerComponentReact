import { Route, Routes } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import { TRoutesMenu } from '~/Types/TRoutesMenu';
import ErrorBoundary from '../ErrorBoundary';

export function _MountRoutes({ routes }: { routes: TRoutesMenu[] }) {
  return (
    <Routes>
      {routes.map(route => (
        <Fragment key={route.label}>
          <Route
            index={route.router?.index}
            key={route.label}
            path={route.path}
            element={<ErrorBoundary>{route.element}</ErrorBoundary>}
          />
          {route.subs && <_MountRoutes routes={route.subs} />}
        </Fragment>
      ))}
    </Routes>
  );
}
