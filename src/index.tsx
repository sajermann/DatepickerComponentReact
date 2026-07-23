import React from 'react';
import ReactDOM from 'react-dom/client';
import { InjectorProviders } from '~/components/InjectorProviders';
import { RoutesConfig } from '~/components/RoutesConfig';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InjectorProviders>
      <RoutesConfig />
    </InjectorProviders>
  </React.StrictMode>,
);
