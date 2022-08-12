import callGateWays from "./call-gateways"
import { createHttpClient } from "./create-http-client"
import ReactDOM from 'react-dom/client';
import React from 'react';



export const configureOnLaunch = (app, options, Component) => {
  app.atlasSdk.lifecycle.onLaunch(async () => {
    console.log('started on launch')
    app.http = await createHttpClient(app.atlasSdk)
    app = await callGateWays(app, options)
    console.log('finished on launch - app-', app)

    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement,
    );
    root.render(
      <React.StrictMode>
        <Component {...app} />
      </React.StrictMode>
    );
  })
}
