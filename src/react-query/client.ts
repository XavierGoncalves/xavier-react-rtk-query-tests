import {
    QueryClient,
} from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
        }
    }
})