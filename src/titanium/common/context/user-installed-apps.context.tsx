import { createContext, useContext } from "react";
import { AppList } from "../gateways/fetch-user-installed-apps";

const CurrentUserInstalledAppsContext = createContext<AppList | undefined>(undefined)

const useCurrentUserInstalledApps = () => {
    const context = useContext(CurrentUserInstalledAppsContext)
    if(!context) {
        throw new Error('useCurrentUserInstalledApps must be used within a CurrentUserInstalledAppsProvider')
    }
    return context
}

interface Props {
    value: AppList;
    children: JSX.Element;
}

const CurrentUserInstalledAppsProvider = ({value, children}: Props) => {
    return <CurrentUserInstalledAppsContext.Provider value={value}>{children}</CurrentUserInstalledAppsContext.Provider>
}


export { useCurrentUserInstalledApps, CurrentUserInstalledAppsProvider}
