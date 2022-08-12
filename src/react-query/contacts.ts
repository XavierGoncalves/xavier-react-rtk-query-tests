import { useQuery } from "@tanstack/react-query";
import { Contact, fetchContacts } from "api/fetch-contacts.api";
import { useSearchParams } from "react-router-dom";
import { useHttpClient } from "titanium/common/context/http.context";

type Select = (any) => Contact

const useContacts = (select?: Select) => {
    const http = useHttpClient()
    const [params] = useSearchParams()

    const pageParam = Number(params.get('page') || 1)
    const sortParam = params.get('sort') || "name"
    const searchParam = params.get('search')

    return useQuery(['contacts', 'list', { page: pageParam, sort: sortParam, searchParam }], () => fetchContacts({
        page: pageParam,
        sort: sortParam,
        search: searchParam,
        http
    }), { select })
}

export const useContact = (contactId: string) => useContacts(data => data.contacts.find(item => item.id === contactId))


export default useContacts
