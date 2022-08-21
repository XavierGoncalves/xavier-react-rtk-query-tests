import { useQuery } from "@tanstack/react-query"
import { useHttpClient } from "titanium/common/context/http.context"
import fetchAssignedUsersApi from "voicemails-app/api/fetch-assigned-users"
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

    const resultGetVoicemails = useQuery(['voicemails', 'list', {
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
    const voicemailsList = resultGetVoicemails.data?.voicemails || []
    const reduceResult = voicemailsList.reduce((acc, voicemail) => {
        const { assignedTo, ringGroups } = voicemail
        // debugger
        const userRingGroups = ringGroups.filter(item =>
            item.match(/^[A-Fa-f0-9]{24}$/) || []
        )
        // debugger
        return acc.concat([assignedTo, ...userRingGroups])
    }, [] as string[]) || []
    // debugger
    const userIds = reduceResult?.filter(id => !!id)
    const shouldFetchAssignedUsers = userIds.length > 0
    // console.log('shouldFetchAssignedUsers->', shouldFetchAssignedUsers)
    // debugger
    useQuery(['assignedUsers', 'list', {
        page,
        voicemailStatus,
        contactId,
        assignedTo,
        when,
        duration,
        ringGroups,
        currentTab
    }], () => fetchAssignedUsersApi({
        userIds,
        http
    }), { enabled: shouldFetchAssignedUsers }
    )

    return resultGetVoicemails
}

export default useGetVoicemails
