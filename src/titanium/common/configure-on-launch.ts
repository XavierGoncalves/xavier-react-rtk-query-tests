import { createHttpClient } from "./create-http-client"

export const configureOnLaunch = (app, options) => {
  app.atlasSdk.lifecycle.onLaunch(async () => {
    app.http = await createHttpClient(options.apiScopes, app.atlasSdk)
  })
}
