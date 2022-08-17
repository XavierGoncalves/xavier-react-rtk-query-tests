import callGateWays from "./call-gateways"
import { createHttpClient } from "./create-http-client"
import ReactDOM from 'react-dom/client';
import React from 'react';



export const configureOnLaunch = (app, options) => {
  return new Promise((resolve) =>{
    app.atlasSdk.lifecycle.onLaunch(async () => {
      console.log('started on launch')
      app.http = await createHttpClient(app.atlasSdk)
      app = await callGateWays(app, options)
      console.log('finished on launch - app-', app)
  
      // const root = ReactDOM.createRoot(
      //   document.getElementById('root') as HTMLElement,
      // );
      // root.render(
      //     <Component {...app} />
      // );
      resolve(app)
    })
  })
  
}
