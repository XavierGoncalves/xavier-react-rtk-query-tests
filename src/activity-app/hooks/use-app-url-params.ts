import { useLocation, useParams, useSearchParams } from "react-router-dom"
import queryStringToPage from "activity-app/utils/query-string-to-page"
// import queryStringToSearch from "activity-app/utils/query-string-to-search"
import queryStringToSort from "activity-app/utils/query-string-to-sort"
import { ALL } from "activity-app/constants/filters.constants"
import validatePage from "activity-app/utils/validate-page"

const useAppUrlParams = () => {
    const [params] = useSearchParams()
    // const {contactId} = useParams()

    // const {search}  = useLocation()
    // console.log('useAppUrlParams-useLocation-search-', search)
    // console.log('useAppUrlParams-useSearchParams-params- page-', params.get('page'))
    // console.log('useAppUrlParams-params.get-', params.get('search'))

    const type = params.get('activityType') || ALL
    const page = validatePage(params.get('page'))
    const sortBy = queryStringToSort(params.get('sortBy'))
    // // const search = queryStringToSearch(params.get('search'))
    // const search = params.get('search')
    // const selectedActivityId = params.get('open')
    const ringGroups: string[] = []
    const selectedActivityId = params.get('selectedActivityId')
    const filtersVisible = params.get('filtersVisible') || false
    return {
        page,
        type,
        via: ALL,
        ringGroups,
        contact: {
            id: ALL,
            label: null
        },
        agent: {
            id: ALL,
            name: null
        },
        when: ALL,
        filtersVisible,
        selectedActivityId,
        sortBy
        // sort, search, selectedActivityId, contactId: contactId || '' 
    }
}

export default useAppUrlParams
