import { createContext, useContext } from "react";
import { Account } from "../gateways/fetch-account";

const AccountDataContext = createContext<Account | undefined>(undefined)

const useAccountData = () => {
    const context = useContext(AccountDataContext)
    if(!context) {
        throw new Error('useAccountData must be used within a AccountDataProvider')
    }
    return context
}

interface Props {
    value: Account;
    children: JSX.Element;
}

const AccountDataProvider = ({value, children}: Props) => {
    return <AccountDataContext.Provider value={value}>{children}</AccountDataContext.Provider>
}


export { useAccountData, AccountDataProvider}
