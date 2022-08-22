import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useHttpClient } from "titanium/common/context/http.context"
import fetchVoicemailsApi from "voicemails-app/api/fetch-voicemails.api"
import useAppUrlParams from "voicemails-app/hooks/use-search-params"
import useGetAssignedUsers from "./use-get-assigned-users"

const useGetVoicemails = () => {
    const http = useHttpClient()

    const {
        page,
        voicemailStatus,
        contactId,
        assignedTo,
        when,
        duration,
        ringGroups,
        currentTab
    } = useAppUrlParams()

    useGetAssignedUsers()

    return useQuery(['voicemails', 'list', {
        page,
        voicemailStatus,
        contactId,
        assignedTo,
        when,
        duration,
        ringGroups,
        currentTab
    }], () => fetchVoicemailsApi({
        page,
        voicemailStatus,
        contactId,
        assignedTo,
        when,
        duration,
        ringGroups,
        http
    }))
}

export const usePrefetchGetVoicemails = () => {
    const http = useHttpClient()
    const queryClient = useQueryClient()

    const {
        voicemailStatus,
        contactId,
        assignedTo,
        when,
        duration,
        ringGroups,
        currentTab
    } = useAppUrlParams()
    useGetAssignedUsers()


    return (page: number) => queryClient.prefetchQuery(['voicemails', 'list', {
        page,
        voicemailStatus,
        contactId,
        assignedTo,
        when,
        duration,
        ringGroups,
        currentTab
    }], () => fetchVoicemailsApi({
        page,
        voicemailStatus,
        contactId,
        assignedTo,
        when,
        duration,
        ringGroups,
        http
    }))
}

export default useGetVoicemails
