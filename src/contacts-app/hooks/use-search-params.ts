import { useLocation, useParams, useSearchParams } from "react-router-dom"
import queryStringToPage from "contacts-app/utils/query-string-to-page"
import queryStringToSearch from "contacts-app/utils/query-string-to-search"
import queryStringToSort from "contacts-app/utils/query-string-to-sort"

const useAppUrlParams = () => {
    const [params] = useSearchParams()
    const {contactId} = useParams()

    // const {search}  = useLocation()
    // console.log('useAppUrlParams-useLocation-search-', search)
    // console.log('useAppUrlParams-useSearchParams-params- page-', params.get('page'))
    // console.log('useAppUrlParams-params.get-', params.get('search'))

    const page = queryStringToPage(params.get('page'))
    const sort = queryStringToSort(params.get('sort'))
    // const search = queryStringToSearch(params.get('search'))
    const search = params.get('search')
    const selectedActivityId = params.get('open')
    return { page, sort, search, selectedActivityId, contactId: contactId || '' }
}

export default useAppUrlParams
