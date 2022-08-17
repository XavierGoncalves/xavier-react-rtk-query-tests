import { AppType } from "types"
import { configureNavigation } from "./utils/configure-navigation"
import { configureOnLaunch } from "./utils/configure-on-launch"
import { DEFAULT_OPTIONS } from "./constants/constants"
import { createToken } from "./utils/create-token"
import { configureI18n } from "./utils/i18n"
import { Atlas } from "@atlas/sdk"
import { createHttpClient } from "./utils/create-http-client"
import callGateWays from "./utils/call-gateways"

const createAtlasApp = (atlasSdk: Atlas, opts = {}): Promise<any> => {
    return new Promise(async (resolve) => {
        try {
            const options = { ...DEFAULT_OPTIONS, ...opts }
            let app: AppType = {atlasSdk}
            app.history = configureNavigation(
                options.navigationEnabled,
                atlasSdk
            )
            createToken(app.atlasSdk, options.apiScopes)
            // connect primeiro, só depois do connect estar "resolvido" é que o atlas está "pronto" e corre o callback do onLaunch
            app.atlasSdk.lifecycle.onLaunch(async () => {
                console.log('started on launch')
                app.http = await createHttpClient(app.atlasSdk)
                app = await callGateWays(app, options)
                await configureI18n(app)
                console.log('finished on launch - app-', app)
            
                // const root = ReactDOM.createRoot(
                //   document.getElementById('root') as HTMLElement,
                // );
                // root.render(
                //     <Component {...app} />
                // );
                resolve(app)
            })
            await app.atlasSdk.connect() 
            // await configureOnLaunch(app, options)
        } catch (error) {
            console.log('createAtlasApp-error-', error)
        }
    })
}

export default createAtlasApp
