import { Atlas } from "@atlas/sdk";
import { createContext, useContext } from "react";

const AtlasSdkContext = createContext<Atlas | undefined>(undefined)

const useAtlasSdk = () => {
    const context = useContext(AtlasSdkContext)
    if(!context) {
        throw new Error('useAtlasSdk must be used within a AtlasSdkProvider')
    }
    return context
}

interface Props {
    value: Atlas;
    children: JSX.Element;
}

const AtlasSdkProvider = ({value, children}: Props) => {
    return <AtlasSdkContext.Provider value={value}>{children}</AtlasSdkContext.Provider>
}


export { useAtlasSdk, AtlasSdkProvider}
