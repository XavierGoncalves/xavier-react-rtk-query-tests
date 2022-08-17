import { useQuery, useQueryClient } from "@tanstack/react-query"
import fetchActivitiesApi, { FetchActivitiesOutput } from "activity-app/api/fetch-activities.api"
import useAppUrlParams from "activity-app/hooks/use-app-url-params"
import { useHttpClient } from "titanium/common/context/http.context"
import { Activity } from "types"


export const useGetActivities = () => {
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
    return useQuery(['activities', 'list', {
        page,
        type,
        via,
        ringGroups,
        contact,
        agent,
        sortBy
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

export const usePrefetchGetActivities = () => {
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
    return (page: number) => queryClient.prefetchQuery(['activities', 'list', {
        page,
        type,
        via,
        ringGroups,
        contact,
        agent
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

export const useGetActivitiesWithSelect = (selectFn: (data: FetchActivitiesOutput) => Activity | undefined) => {
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
    return useQuery(['activities', 'list', {
        page,
        type,
        via,
        ringGroups,
        contact,
        agent,
        sortBy
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
    }), { select: selectFn })
}


export const useSelectedActivity = (activityId: string) => useGetActivitiesWithSelect((data) => data?.activities ? data.activities.find(item => item.id === activityId) || undefined : undefined)
