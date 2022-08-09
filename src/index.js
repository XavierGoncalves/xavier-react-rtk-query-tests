import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AtlasSdk from '@atlas/sdk';
import TokenGenerator from './config/token.generator';
import HttpClient from './config/http.client';
import configI18n from './config/i18n';

async function start() {
  AtlasSdk.lifecycle.onLaunch(async () => {
    const { language } = await AtlasSdk.i18n.getConfig();
    const { changeLanguage } = await configI18n(language);
    AtlasSdk.i18n.onSwitchLanguage(changeLanguage);

    const { apiGatewayUrl } = await AtlasSdk.environment.getConfig();
    HttpClient.initialize(apiGatewayUrl)

    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
  });

  TokenGenerator.initialize(
    () => AtlasSdk.authorization.getAccessToken()
  );

  await AtlasSdk.connect();
}

start().catch(console.error);
