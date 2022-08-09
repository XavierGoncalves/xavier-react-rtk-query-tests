import React from 'react';
import ReactDOM from 'react-dom/client';
import AtlasSdk from '@atlas/sdk';
import configI18n from './config/i18n'
import TokenGenerator from './config/token.generator';
import HttpClient from './config/http.client';
import App from './App';

async function start() {
  AtlasSdk.lifecycle.onLaunch(async () => {
    const { language } = await AtlasSdk.i18n.getConfig();
    const { changeLanguage } = await configI18n(language);
    AtlasSdk.i18n.onSwitchLanguage(changeLanguage);

    const { apiGatewayUrl } = await AtlasSdk.environment.getConfig();
    HttpClient.initialize(apiGatewayUrl)

    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement,
    );

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });

  TokenGenerator.initialize(
    () => AtlasSdk.authorization.getAccessToken()
  );

  await AtlasSdk.connect();
}

start().catch(console.error);
