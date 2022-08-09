import { AppType } from "types"
import { configureNavigation } from "./configure-navigation"
import { configureOnLaunch } from "./configure-on-launch"
import { DEFAULT_OPTIONS } from "./constants/constants"
import { createToken } from "./create-token"
import { configureI18n } from "./i18n"

const createAtlasApp = async (atlasSdk, opts = {}) => {
    const options = { ...DEFAULT_OPTIONS, ...opts }
    let app: AppType = {atlasSdk}
    app.history = configureNavigation(
        options.navigationEnabled,
        atlasSdk
    )
    configureOnLaunch(app, options)
    createToken(app.atlasSdk, options.apiScopes)
    
    await app.atlasSdk.connect() 
    await configureI18n(app)

    return app
}

export default createAtlasApp
