import React from 'react';
import ReactDOM from 'react-dom/client';
import AtlasSdk from '@atlas/sdk';
import App from './components/app/App';
import createAtlasApp from 'titanium/common/create-atlas-app';
import { apiScopes, policies } from 'constants/constants';

createAtlasApp(AtlasSdk, {
  apiScopes,
  load: {
    user: true,
    account: true,
    policies,
    getUserAppsList: true,
    navigationEnabled: true,
  }
}).then((app) => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );
  console.log('called root.render -app-', app)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch((error) => console.log('XAVIER - Unexpected error', error));
