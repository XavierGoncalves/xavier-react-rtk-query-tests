import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useHttpClient } from "titanium/common/context/http.context"
import { Voicemail } from "types"
import fetchAssignedUsersApi from "voicemails-app/api/fetch-assigned-users"
import useAppUrlParams from "voicemails-app/hooks/use-search-params"

const useGetAssignedUsers = () => {
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
    const queryClient = useQueryClient()

    const voicemailsData: any = queryClient.getQueryData(['voicemails', 'list', {
        page,
        voicemailStatus,
        contactId,
        assignedTo,
        when,
        duration,
        ringGroups,
        currentTab
    }])
    const voicemailsList: Voicemail[] = voicemailsData?.voicemails || []
    const reduceResult = voicemailsList.reduce((acc, voicemail) => {
        const { assignedTo, ringGroups } = voicemail
        // debugger
        const userRingGroups = ringGroups.filter(item =>
            item.match(/^[A-Fa-f0-9]{24}$/) || []
        )
        // debugger
        return acc.concat([assignedTo, ...userRingGroups])
    }, [] as string[]) || []
    // // debugger
    const userIds = reduceResult?.filter(id => !!id)
    const shouldFetchAssignedUsers = userIds.length > 0
    // console.log('shouldFetchAssignedUsers->', shouldFetchAssignedUsers)
    // debugger
    return useQuery(['assignedUsers', 'list', {
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
}


// const usePrefetchGetAssignedUsers = () => {
//     const http = useHttpClient()
//     const queryClient = useQueryClient()
//     const {
//         page,
//         voicemailStatus,
//         contactId,
//         assignedTo,
//         when,
//         duration,
//         ringGroups,
//         currentTab
//     } = useAppUrlParams()
//     const queryClient = useQueryClient()

//     const voicemailsData: any = queryClient.getQueryData(['voicemails', 'list', {
//         page,
//         voicemailStatus,
//         contactId,
//         assignedTo,
//         when,
//         duration,
//         ringGroups,
//         currentTab
//     }])
//     const voicemailsList: Voicemail[] = voicemailsData?.voicemails || []
//     const reduceResult = voicemailsList.reduce((acc, voicemail) => {
//         const { assignedTo, ringGroups } = voicemail
//         // debugger
//         const userRingGroups = ringGroups.filter(item =>
//             item.match(/^[A-Fa-f0-9]{24}$/) || []
//         )
//         // debugger
//         return acc.concat([assignedTo, ...userRingGroups])
//     }, [] as string[]) || []
//     // // debugger
//     const userIds = reduceResult?.filter(id => !!id)
//     const shouldFetchAssignedUsers = userIds.length > 0
//     // console.log('shouldFetchAssignedUsers->', shouldFetchAssignedUsers)
//     // debugger
//     return queryClient.prefetchQuery(['assignedUsers', 'list', {
//         page,
//         voicemailStatus,
//         contactId,
//         assignedTo,
//         when,
//         duration,
//         ringGroups,
//         currentTab
//     }], () => fetchAssignedUsersApi({
//         userIds,
//         http
//     }), { enabled: shouldFetchAssignedUsers }
//     )
// }

export default useGetAssignedUsers
