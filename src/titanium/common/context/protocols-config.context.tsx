import { createContext, useContext } from "react";
import { Account } from "../gateways/fetch-account";

interface Protocol {
    isAvailable: boolean;
    trigger: (...args: string[]) => void
}

interface ProtocolsConfig {
    [key: string]: Protocol
}

const ProtocolsConfigContext = createContext<ProtocolsConfig | undefined>(undefined)

const useProtocolsConfig = () => {
    const context = useContext(ProtocolsConfigContext)
    if(!context) {
        throw new Error('useProtocolsConfig must be used within a ProtocolsConfigProvider')
    }
    return context
}

interface Props {
    value: ProtocolsConfig;
    children: JSX.Element;
}

const ProtocolsConfigProvider = ({value, children}: Props) => {
    return <ProtocolsConfigContext.Provider value={value}>{children}</ProtocolsConfigContext.Provider>
}


export { useProtocolsConfig, ProtocolsConfigProvider}
