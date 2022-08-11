import callGateWays from "./call-gateways"
import { createHttpClient } from "./create-http-client"

export const configureOnLaunch = (app, options) => {
  app.atlasSdk.lifecycle.onLaunch(async () => {
    console.log('called on launch')
    app.http = await createHttpClient(app.atlasSdk)
    await callGateWays(app, options)
  })
}
