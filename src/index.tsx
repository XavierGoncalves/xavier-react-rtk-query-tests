import React from 'react';
import ReactDOM from 'react-dom/client';
import AtlasSdk from '@atlas/sdk';
import ContactsApp from './contacts-app/app/ContactsApp';
import createAtlasApp from 'titanium/common/create-atlas-app';
import { apiScopes } from 'contacts-app/constants/scopes.constants';
import { policies } from 'contacts-app/constants/policies.constants';
import ActivityApp from 'activity-app/app/ActivityApp';

createAtlasApp(AtlasSdk, {
  apiScopes,
  load: {
    user: true,
    account: true,
    policies,
    getUserAppsList: true,
    navigationEnabled: true,
  }
  /*
  react-dom.development.js:86 Warning: Legacy context API has been detected within a strict-mode tree.
  
  The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.
  
  Please update the following components: Transition
  
  Learn more about this warning here: https://reactjs.org/link/legacy-context
      at Transition (http://localhost:3000/static/js/bundle.js:156819:30)
      at Modal (http://localhost:3000/static/js/bundle.js:33300:23)
      at ContactDeleteModal
  
  */
 /* CONTACTS APP */
  // }, (props) => (<React.StrictMode><ContactsApp {...props} /></React.StrictMode>))
// }, (props) => (<ContactsApp {...props} />))
/* ACTIVITY APP */
// }, (props) => (<React.StrictMode><ActivityApp {...props} /></React.StrictMode>))
}, (props) => (<ActivityApp {...props} />))
  .then((app) => {
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
