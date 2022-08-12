import { fetchAccount } from "../gateways/fetch-account"
import { fetchCurrentUser } from "../gateways/fetch-current-user"
import { fetchPolicies } from "../gateways/fetch-policies"
import { fetchUserInstalledApps } from "../gateways/fetch-user-installed-apps"

const callGateWays = async (app, options) => {
    let promiseArr: any[] = []
    if (options.load.user) {
        promiseArr.push(fetchCurrentUser(app.http))
    }

    if (options.load.account) {
        promiseArr.push(await fetchAccount(app.http))
    }

    if (options.load.policies !== false) {
        promiseArr.push(fetchPolicies(options.load.policies, app.http))
    }
    
    if (options.load.getUserAppsList !== false) {
        promiseArr.push(fetchUserInstalledApps(app.http))
    }

    const promiseArrResponse = await Promise.all(promiseArr)
    
    return {
        ...app,
        ...promiseArrResponse.reduce((acc, curr) => ({...acc, ...curr}), {})
    }
}

export default callGateWays
