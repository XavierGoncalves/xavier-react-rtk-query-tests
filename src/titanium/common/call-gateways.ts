import { fetchAccount } from "./gateways/fetch-account"
import { fetchCurrentUser } from "./gateways/fetch-current-user"
import { fetchPolicies } from "./gateways/fetch-policies"
import { fetchUserInstalledApps } from "./gateways/fetch-user-installed-apps"

const callGateWays = async (app, options) => {
    if (options.load.user) {
        app.user = await fetchCurrentUser(app.http)
    }

    if (options.load.account) {
        app.account = await fetchAccount(app.http)
    }

    if (options.load.policies !== false) {
        app.policies = await fetchPolicies(options.load.policies, app.http)
    }
    
    if (options.load.getUserAppsList !== false) {
        app.userInstalledApps = await fetchUserInstalledApps(app.http)
    }
    return app
}

export default callGateWays
