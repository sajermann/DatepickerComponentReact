import React from 'react';
import ReactDOM from 'react-dom/client';
import { InjectorProviders } from '~/Components/Shared/InjectorProviders';
import { RoutesConfig } from '~/Components/Shared/RoutesConfig';

import './global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InjectorProviders>
      <RoutesConfig />
    </InjectorProviders>
  </React.StrictMode>,
);
