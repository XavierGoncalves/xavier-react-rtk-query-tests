import { useQuery } from "@tanstack/react-query";
import { Contact, fetchContacts } from "api/fetch-contacts.api";
import useAppUrlParams from "hooks/use-search-params";
import { useHttpClient } from "titanium/common/context/http.context";

const useContacts = () => {
    const http = useHttpClient()

    const { page, search, sort } = useAppUrlParams()

    return useQuery(['contacts', 'list', { page, sort, search }], () => fetchContacts({
        page,
        sort,
        search,
        http
    }))
}


type Select = (any) => Contact

const useContactsWithSelect = (select: Select) => {
    const http = useHttpClient()

    const { page, search, sort } = useAppUrlParams()

    return useQuery(['contacts', 'list', { page, sort, search }], () => fetchContacts({
        page,
        sort,
        search,
        http
    }))
}

export const useContact = (contactId: string) => useContactsWithSelect(data => data.contacts.find(item => item.id === contactId))


export default useContacts
