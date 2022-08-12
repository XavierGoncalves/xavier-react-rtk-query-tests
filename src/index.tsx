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
}, (props) => (<React.StrictMode><App {...props} /></React.StrictMode>)).then((app) => {
  // console.log('createAtlasApp - called root.render -app-', app)
  // console.log('createAtlasApp - account-', app.account)
  // console.log('createAtlasApp - atlasSdk-', app.atlasSdk)
  // console.log('createAtlasApp - history-', app.history)
  // console.log('createAtlasApp - http-', app.http)
  // console.log('createAtlasApp - user-', app.user)
  // console.log('createAtlasApp - policies-', app.policies)
  // console.log('createAtlasApp - userInstalledApps-', app.userInstalledApps)

  // const root = ReactDOM.createRoot(
  //   document.getElementById('root') as HTMLElement,
  // );

  // root.render(
  //   <React.StrictMode>
      // <App
      //   account={app?.account}
      //   atlasSdk={app?.atlasSdk}
      //   history={app?.history}
      //   http={app?.http}
      //   policies={app?.policies}
      //   user={app?.user}
      //   userInstalledApps={app?.userInstalledApps}
      // />
  //   </React.StrictMode>
  // );
}).catch((error) => console.log('XAVIER - Unexpected error', error));
