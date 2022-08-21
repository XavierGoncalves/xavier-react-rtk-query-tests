import { useQuery } from "@tanstack/react-query"
import { useHttpClient } from "titanium/common/context/http.context"
import fetchVoicemailsApi from "voicemails-app/api/fetch-voicemails.api"
import useAppUrlParams from "voicemails-app/hooks/use-search-params"

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

export default useGetVoicemails
