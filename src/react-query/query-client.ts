import {
    QueryClient,
} from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 15000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            // onError(err) {
                
            // },
        },
        // mutations: {
        //     onError(error, variables, context) {
                
        //     },
        // }
    }
})
