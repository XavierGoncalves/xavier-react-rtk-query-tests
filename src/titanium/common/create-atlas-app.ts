import { AppType } from "types"
import { configureNavigation } from "./configure-navigation"
import { configureOnLaunch } from "./configure-on-launch"
import { configureI18n } from "./i18n"
import tokenGenerator from "./token.generator"
const DEFAULT_OPTIONS = {
    load: {
        user: false,
        account: false,
        policies: false,
        getUserAppsList: false
    },
    navigationEnabled: true,
    apiScopes: {}
}
const createAtlasApp = async (atlasSdk, opts = {}) => {
    const options = { ...DEFAULT_OPTIONS, ...opts }
    let app: AppType = {atlasSdk}
    app.history = configureNavigation(
        options.navigationEnabled,
        atlasSdk
    )
    configureOnLaunch(app, options)
    tokenGenerator.initialize(
        () => atlasSdk.authorization.getAccessToken({ scopes: options.apiScopes })
    );
    await app.atlasSdk.connect() 
    await configureI18n(app)

    return app
}

export default createAtlasApp
