import { createContext, useContext } from "react";
import { User } from "../gateways/fetch-current-user";

const CurrentUserContext = createContext<User | undefined>(undefined)

const useCurrentUser = () => {
    const context = useContext(CurrentUserContext)
    if(!context) {
        throw new Error('useCurrentUser must be used within a CurrentUserProvider')
    }
    return context
}

interface Props {
    value: User;
    children: JSX.Element;
}

const CurrentUserProvider = ({value, children}: Props) => {
    return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}


export { useCurrentUser, CurrentUserProvider}
