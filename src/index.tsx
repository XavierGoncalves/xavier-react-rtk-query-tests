import React from 'react';
import ReactDOM from 'react-dom/client';
import AtlasSdk from '@atlas/sdk';
import App from './App';
import createAtlasApp from 'titanium/common/create-atlas-app';

// async function start() {
  // AtlasSdk.lifecycle.onLaunch(async () => {
    // const { language } = await AtlasSdk.i18n.getConfig();
    // const { changeLanguage } = await configI18n(language);
    // AtlasSdk.i18n.onSwitchLanguage(changeLanguage);

    // const { apiGatewayUrl } = await AtlasSdk.environment.getConfig();
    // console.log('invokes - AtlasSdk.environment.getConfig')
    // HttpClient.getInstance(apiGatewayUrl)

  //   const root = ReactDOM.createRoot(
  //     document.getElementById('root') as HTMLElement,
  //   );

  //   root.render(
  //     <React.StrictMode>
  //       <App />
  //     </React.StrictMode>
  //   );
  // });

  // TokenGenerator.initialize(
  //   () => AtlasSdk.authorization.getAccessToken()
  // );

  // await AtlasSdk.connect();
// }

// start().then().catch(console.error);
const apiScopes = [
  'account:read',
  'contact-details:read',
  'contact-details:write',
  'contacts-activities:read',
  'graph-users:read',
  'numbers:read',
  'openid',
  'policies:evaluate',
  'recordings:read',
  'account-favorites:read',
  'account-custom-fields:read'
]

const policies = [
  'calls.recordings.listen',
  'contacts.create',
  'contacts.update',
  'contacts.delete'
]
createAtlasApp(AtlasSdk, {apiScopes, load: {
  user: true,
  account: true,
  policies,
  getUserAppsList: false,
  navigationEnabled: true,
}}).then((app) => {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement,
    );

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
}).catch((error) => console.log('XAVIER - Unexpected error', error));
