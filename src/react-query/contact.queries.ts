import { useQuery } from "@tanstack/react-query"
import fetchContact from "api/fetch-contact.api"
import useAppUrlParams from "hooks/use-search-params"
import { useHttpClient } from "titanium/common/context/http.context"

const useGetContact = () => {
    const http = useHttpClient()
    const { contactId } = useAppUrlParams()
    return useQuery(['contacts', 'list', { contactId }], () => fetchContact(
        contactId,
        http
    ))
}
export default useGetContact
