
import { createContext, useContext } from "react";
import { Policies } from "../gateways/fetch-policies";

const PoliciesContext = createContext<Policies | undefined>(undefined)

const usePolicies = () => {
    const context = useContext(PoliciesContext)
    if (!context) {
        throw new Error('usePolicies must be used within a PoliciesProvider')
    }
    return context
}

const usePolicy = (policy: string) => {
    const context = useContext(PoliciesContext)
    if (!context) {
        throw new Error('usePolicies must be used within a PoliciesProvider')
    }
    return context[policy] || false
}


interface Props {
    value: Policies;
    children: JSX.Element;
}

const PoliciesProvider = ({ value, children }: Props) => {
    return <PoliciesContext.Provider value={value}>{children}</PoliciesContext.Provider>
}


export { usePolicies, usePolicy, PoliciesProvider }
