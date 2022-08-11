import { AxiosInstance } from "axios";
import { createContext, useContext } from "react";

const HttpClientContext = createContext<AxiosInstance | undefined>(undefined)

const useHttpClient = () => {
    const context = useContext(HttpClientContext)
    if(!context) {
        throw new Error('useHttpClient must be used within a HttpClientProvider')
    }
    return context
}

interface Props {
    value: AxiosInstance;
    children: JSX.Element;
}

const HttpClientProvider = ({value, children}: Props) => {
    return <HttpClientContext.Provider value={value}>{children}</HttpClientContext.Provider>
}


export { useHttpClient, HttpClientProvider}
