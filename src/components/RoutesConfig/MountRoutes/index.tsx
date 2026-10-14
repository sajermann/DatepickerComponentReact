import { Fragment } from 'react/jsx-runtime';
import { Route, Routes } from 'react-router';
import type { TRoutesMenu } from '~/types/TRoutesMenu';
import ErrorBoundary from '../ErrorBoundary';

export function MountRoutes({ routes }: { routes: TRoutesMenu[] }) {
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
          {route.subs && <MountRoutes routes={route.subs} />}
        </Fragment>
      ))}
    </Routes>
  );
}
