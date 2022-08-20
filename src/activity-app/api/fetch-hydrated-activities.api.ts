import getRequestFilters from 'activity-app/utils/get-request-filters'
import getRequestParams from 'activity-app/utils/get-request-params'
import presentActivity from 'activity-app/utils/present-activity'
import get from 'lodash/get'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import paramsSerializer from 'activity-app/utils/params-serializer'
import { Activity, ActivityAgent, AgentFilter, ContactFilter, SortType } from 'types'
import { AxiosInstance } from 'axios'
import { perPage } from 'contacts-app/constants/constants'
import fetchContactsById from './fetch-contacts-by-id'
import fetchUsersById from './fetch-users-by-id'

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

export interface FetchHydratedActivitiesOutput {
    activities: Activity[],
    total: number;
    totalPages: number;
    page: number;
    lastUpdated: string;
}

const hydrateWithContacts = async (activities: Activity[], http: AxiosInstance) => {
    try {
        const contactIds = activities
            .map(activity => activity.contact.id)
            .filter(Boolean)

        if (contactIds.length === 0) {
            return activities
        }
        const contactsById = await fetchContactsById({ contactIds, http })
        const hydratedActivities = activities.map(activity => {
            const { id: contactId } = activity.contact
            const contactById = contactsById ? contactsById[contactId] : {}
            const updatedContact = contactById
                ? { ...activity.contact, ...contactById }
                : { ...activity.contact, deleted: true }
            // console.log('hydratedActivities - oldContact->', activity.contact)
            // console.log('hydratedActivities - updatedContact->', updatedContact)
            return {
                ...activity,
                contact: updatedContact
            }
        })
        return hydratedActivities


    } catch (error) {
        console.error('Error on hydrating activities with contacts', {
            exception: error
        })
    } finally {
        return activities
    }
}

const hydrateWithUsers = async (activities: Activity[], http: AxiosInstance) => {
    try {
        const agents = activities.map(({ agent }) => agent)
        // console.log('hydrateWithUsers - 1 - agents->', agents)
        const uniqueAgents: ActivityAgent[] = uniqBy(agents, 'id')
        // console.log('hydrateWithUsers - 2 - uniqueAgents->', uniqueAgents)
        const userIds = uniqueAgents.filter(({id}) => !!id).map(({id}) => id) as string[]
        // console.log('hydrateWithUsers - 3 - userIds->', userIds)
        if (userIds.length === 0) {
            return activities
        }
        const users = await fetchUsersById({ userIds, http })
        const hydratedActivities = activities.map(activity => {
            const { id: agentId } = activity.agent
            const userObj = users.find(({ id }) => id === agentId)
            if (userObj) {
                return {
                    ...activity,
                    agent: { id: agentId, name: userObj.name }
                }
            }
            return activity
        })
        return hydratedActivities


    } catch (error) {
        console.error('Error on hydrating activities with users', {
            exception: error
        })
    } finally {
        return activities
    }
}

const fetchHydratedActivitiesApi = async ({
    http,
    page = 1,
    sortBy,
    ringGroups,
    type,
    via,
    when,
    agent,
    contact,
}: Input) => {
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
    let activities = get(response, 'data._embedded', []).map(presentActivity)

    if (activities.length > 0) {
        activities = await hydrateWithContacts(activities, http)
        activities = await hydrateWithUsers(activities, http)
    }
    const { page: currentPage, total } = response.data

    return {
        activities,
        total,
        totalPages: Math.ceil(total / perPage),
        page: currentPage,
        lastUpdated: new Date().toISOString()
    }
}
export default fetchHydratedActivitiesApi

