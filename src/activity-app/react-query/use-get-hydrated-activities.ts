import { useQuery, useQueryClient } from "@tanstack/react-query"
import fetchActivitiesApi from "activity-app/api/fetch-activities.api"
import fetchContactsById from "activity-app/api/fetch-contacts-by-id"
import useAppUrlParams from "activity-app/hooks/use-app-url-params"
import { useHttpClient } from "titanium/common/context/http.context"
import { ActivityAgent } from "types"
import uniqBy from 'lodash/uniqBy'
import fetchUsersById from "activity-app/api/fetch-users-by-id"

const useGetHydratedActivities = () => {
    const http = useHttpClient()
    const {
        page,
        type,
        via,
        ringGroups,
        contact,
        agent,
        sortBy,
        when
    } = useAppUrlParams()
    const { data: activitiesData, isFetching: isFetchingActivities, isError: isErrorActivities, refetch: refetchActitivies } = useQuery(['activities', 'list', {
        page,
        type,
        via,
        ringGroups,
        contact,
        agent,
        sortBy,
        when
    }], () => fetchActivitiesApi({
        sortBy,
        page,
        type,
        via,
        ringGroups,
        contact,
        agent,
        when,
        http
    }))
    const activities = activitiesData?.activities || []
    const contactIds = activities.map(activity => activity.contact.id).filter(Boolean) || []
    const agents = activities.map(({ agent }) => agent)
    const uniqueAgents: ActivityAgent[] = uniqBy(agents, 'id')
    const userIds = uniqueAgents.filter(({ id }) => !!id).map(({ id }) => id) as string[]

    const { data: contactsByIdData, isFetching: isFetchingContactsById, isError: isErrorContactsById, refetch: refetchContactsById } = useQuery(['contactsById', {
        page,
        type,
        via,
        ringGroups,
        contact,
        agent,
        sortBy,
        when
    }], () => fetchContactsById({ contactIds, http }), {
        enabled: contactIds?.length > 0 && Boolean(activities.length > 0)
    })

    const { data: usersByIdData, isFetching: isFetchingUsersById, isError: isErrorUsersById, refetch: refetchUsersById } = useQuery(['usersById', {
        page,
        type,
        via,
        ringGroups,
        contact,
        agent,
        sortBy,
        when
    }], () => fetchUsersById({ userIds, http }), {
        enabled: userIds?.length > 0 && Boolean(activities.length > 0)
    })

    const newActivities = activities.map(activity => {
        const { id: contactId } = activity.contact
        const contactById = contactsByIdData ? contactsByIdData[contactId] : {}
        const updatedContact = contactById
            ? { ...activity.contact, ...contactById }
            : { ...activity.contact, deleted: true }
        const { id: agentId } = activity.agent
        const userObj = agentId && usersByIdData ? usersByIdData[agentId] : null
        const newAgent: ActivityAgent = userObj ? userObj : activity.agent;
        return {
            ...activity,
            agent: newAgent,
            contact: updatedContact
        }
    })
    return {
        data: {
            ...activitiesData,
            activities: newActivities,
        },
        isFetching: isFetchingActivities && isFetchingContactsById && isFetchingUsersById,
        refetch: () => {
            refetchActitivies();
            refetchContactsById();
            refetchUsersById();
        },
        isError: isErrorActivities
    }
}
// THERE'S NO WAY TO PREFETCH DEPENDENT QUERIES VIA HOOKS, USE "MEGA" API INSTEAD
export const usePrefetchGetHydratedActivities = () => {
    const http = useHttpClient()
    const queryClient = useQueryClient();
    const {
        type,
        via,
        ringGroups,
        contact,
        agent,
        sortBy,
        when
    } = useAppUrlParams()
    return async (page: number) => queryClient.prefetchQuery(['activities', 'list', {
        page,
        type,
        via,
        ringGroups,
        contact,
        agent,
        sortBy,
        when
    }], () => fetchActivitiesApi({
        sortBy,
        page,
        type,
        via,
        ringGroups,
        contact,
        agent,
        when,
        http
    }))
}

export default useGetHydratedActivities
