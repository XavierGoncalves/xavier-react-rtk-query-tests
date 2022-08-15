import { useQuery } from "@tanstack/react-query"
import { fetchAccountCustomFields } from "apps/contacts-app/api/fetch-account-custom-fields.api"
import { useHttpClient } from "titanium/common/context/http.context"

const useGetAccountCustomFields = () => {
    const http = useHttpClient()

    return useQuery(['custom-fields', 'list'], () => fetchAccountCustomFields(http), {
        staleTime: 100000,
        // cacheTime: 100000
    })
}

export default useGetAccountCustomFields
