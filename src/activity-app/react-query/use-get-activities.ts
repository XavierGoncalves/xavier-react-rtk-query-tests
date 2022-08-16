import { useQuery } from "@tanstack/react-query"
import fetchActivitiesApi from "activity-app/api/fetch-activities.api"
import useAppUrlParams from "activity-app/hooks/use-app-url-params"
import { useHttpClient } from "titanium/common/context/http.context"


export const useGetActivities = () => {
    const http = useHttpClient()
    const { 
        page,
        type,
        via,
        ringGroups,
        contact,
        agent,
        orderBy,
        when
    } = useAppUrlParams()
    return useQuery(['activities', 'list', { 
        page,
        type,
        via,
        ringGroups,
        contact,
        agent 
    }], () => fetchActivitiesApi({
        orderBy,
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
