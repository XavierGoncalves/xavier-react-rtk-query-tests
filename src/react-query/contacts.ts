import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Contact, fetchContacts } from "api/fetch-contacts.api";
import useAppUrlParams from "hooks/use-search-params";
import { useHttpClient } from "titanium/common/context/http.context";

const useGetContacts = () => {
    const http = useHttpClient()

    const { page, search, sort } = useAppUrlParams()
    console.log('useGetContacts-search-', search)
    return useQuery(['contacts', 'list', { page, sort, search }], () => fetchContacts({
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

    return useQuery(['contacts', 'list', { page, sort, search }], () => fetchContacts({
        page,
        sort,
        search,
        http
    }), { select })
}

export const useContact = (contactId: string) => useGetContactsWithSelect(data => data.contacts.find(item => item.id === contactId))

export const useInvalidateGetContacts = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries(['contacts', 'list']);
  };

export default useGetContacts
