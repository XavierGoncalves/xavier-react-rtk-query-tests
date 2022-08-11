import callGateWays from "./call-gateways"
import { createHttpClient } from "./create-http-client"

export const configureOnLaunch = (app, options) => {
  app.atlasSdk.lifecycle.onLaunch(async () => {
    console.log('started on launch')
    app.http = await createHttpClient(app.atlasSdk)
    app = await callGateWays(app, options)
    console.log('finished on launch - app-', app)
  })
}
