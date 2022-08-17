import getRequestFilters from 'activity-app/utils/get-request-filters'
import getRequestParams from 'activity-app/utils/get-request-params'
import presentActivity from 'activity-app/utils/present-activity'
import get from 'lodash/get'
import paramsSerializer from 'activity-app/utils/params-serializer'
import { Activity, AgentFilter, ContactFilter, SortType } from 'types'
import { AxiosInstance } from 'axios'
import { perPage } from 'contacts-app/constants/constants'

interface Input {
    http: AxiosInstance;
    page?: number;
    sortBy: SortType;
    ringGroups: string[];
    type: string;
    via: string;
    when: string;
    agent: AgentFilter;
    contact: ContactFilter;
}

export interface FetchActivitiesOutput {
    activities: Activity[],
    total: number;
    totalPages: number;
    page: number;
    lastUpdated: string;
}

const fetchActivitiesApi = async ({
    http,
    page = 1,
    sortBy,
    ringGroups,
    type,
    via,
    when,
    agent,
    contact,
}: Input): Promise<FetchActivitiesOutput> => {
    const response = await http.get('interaction-contacts', {
        params: {
            page,
            per_page: perPage,
            ...getRequestParams(sortBy),
            ...getRequestFilters({
                ringGroups,
                type,
                via,
                when,
                agent,
                contact,
            })
        },
        paramsSerializer
    })
    // SEM FILTROS
    // ?page=1&per_page=10&order_by=sortable_started_at%3ADESC
    
    // COM FILTROS
    // ?page=1&per_page=10&order_by=sortable_started_at%3ADESC&type=INBOUND&date__from=2022-08-09T22%3A56%3A10.444Z&contact_person_id=61fd8688d782fd001af21bd9&ring_groups=%2522xavier&user_id=613f28ccbd32b443cbaa86f3
    const activities: Activity[] = get(response, 'data._embedded', []).map(presentActivity)
    const { page: currentPage, total } = response.data

  return {
    activities,
    total,
    totalPages: Math.ceil(total / perPage),
    page: currentPage,
    lastUpdated: new Date().toISOString()
  }
}
export default fetchActivitiesApi

