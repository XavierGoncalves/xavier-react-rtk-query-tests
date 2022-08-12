import { AppType } from "types"
import { configureNavigation } from "./utils/configure-navigation"
import { configureOnLaunch } from "./utils/configure-on-launch"
import { DEFAULT_OPTIONS } from "./constants/constants"
import { createToken } from "./utils/create-token"
import { configureI18n } from "./utils/i18n"
import { Atlas } from "@atlas/sdk/lib/src/atlas/atlas"

const createAtlasApp= async (atlasSdk: Atlas, opts = {}, component) => {
    try {
        const options = { ...DEFAULT_OPTIONS, ...opts }
        let app: AppType = {atlasSdk}
        app.history = configureNavigation(
            options.navigationEnabled,
            atlasSdk
        )
        createToken(app.atlasSdk, options.apiScopes)
        configureOnLaunch(app, options, component)
        
        await app.atlasSdk.connect() 
        await configureI18n(app)

        // return app
    } catch (error) {
        console.log('createAtlasApp-error-', error)
    }
    
}

export default createAtlasApp