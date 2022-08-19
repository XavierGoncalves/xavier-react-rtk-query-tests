import { useLocation, useParams, useSearchParams } from "react-router-dom"
import queryStringToPage from "activity-app/utils/query-string-to-page"
// import queryStringToSearch from "activity-app/utils/query-string-to-search"
import queryStringToSort from "activity-app/utils/query-string-to-sort"
import { ALL, ALL_USER } from "activity-app/constants/filters.constants"
import validatePage from "activity-app/utils/validate-page"
import * as qs from 'qs'

const useAppUrlParams = () => {
    const [params] = useSearchParams()
    // const {contactId} = useParams()

    // const {search}  = useLocation()
    // console.log('useAppUrlParams-useLocation-search-', search)
    // console.log('useAppUrlParams-useSearchParams-params- page-', params.get('page'))
    // console.log('useAppUrlParams-params.get-', params.get('search'))

    const type = params.get('type') || ALL
    const page = validatePage(params.get('page'))
    const sortBy = queryStringToSort(params.get('sortBy'))
    // // const search = queryStringToSearch(params.get('search'))
    // const search = params.get('search')
    // const selectedActivityId = params.get('open')
    let teste
    let ringGroups: string[] = []
    if(Array.isArray(qs.parse(params.toString())?.ringGroups)) {
        teste = qs.parse(params.toString())?.ringGroups as string[]
        ringGroups = teste.map(item => item) 
    }
    const selectedActivityId = params.get('selectedActivityId')
    const filtersVisible = params.get('filtersVisible') || false
    const contactId = params.get('contact[id]') || ALL
    const contactLabel = params.get('contact[label]') || null
    const agentId = params.get('agent[id]') || ALL
    const agentName = params.get('agent[name]') || null
    const when = params.get('when') || ALL
    debugger
    return {
        page,
        type,
        via: ALL,
        ringGroups,
        contact: {
            id: contactId,
            label: contactLabel
        },
        agent: {
            id: agentId,
            name: agentName
        },
        when,
        filtersVisible,
        selectedActivityId,
        sortBy
        // sort, search, selectedActivityId, contactId: contactId || '' 
    }
}

export default useAppUrlParams
