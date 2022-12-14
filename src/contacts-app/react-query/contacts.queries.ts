import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchContactsApi, { Contact } from "contacts-app/api/fetch-contacts.api";
import useAppUrlParams from "contacts-app/hooks/use-search-params";
import { useHttpClient } from "titanium/common/context/http.context";

const useGetContacts = () => {
    const http = useHttpClient()

    const { page, search, sort } = useAppUrlParams()
    return useQuery(['contacts', 'list', { page, sort, search }], () => fetchContactsApi({
        page,
        sort,
        search,
        http
    }))
}

export const usePrefetchGetContacts = () => {
    const http = useHttpClient()
    const queryClient = useQueryClient();

    const { search, sort } = useAppUrlParams()
    return (page: number) => queryClient.prefetchQuery(['contacts', 'list', { page, sort, search }], () => fetchContactsApi({
        page,
        sort,
        search,
        http
    }))
}


type Select = (any) => Contact

const useGetContactsWithSelect = (select: Select) => {
    const http = useHttpClient()

    const { page, search, sort } = useAppUrlParams()

    return useQuery(['contact', 'list', { page, sort, search }], () => fetchContactsApi({
        page,
        sort,
        search,
        http
    }), { select })
}

export const useContac2 = (contactId?: string) => useGetContactsWithSelect(data => data.contacts.find(item => item.id === contactId))

export const useInvalidateGetContacts = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries(['contacts', 'list']);
};

export default useGetContacts
