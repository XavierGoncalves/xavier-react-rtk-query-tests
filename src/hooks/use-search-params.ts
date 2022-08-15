import { useParams, useHistory } from "react-router-dom"
import queryStringToPage from "utils/query-string-to-page"
import queryStringToSearch from "utils/query-string-to-search"
import queryStringToSort from "utils/query-string-to-sort"

const useAppUrlParams = () => {
    const { contactId } = useParams()
    const history = useHistory()
    const params = new URLSearchParams(history.location.search)
    const page = queryStringToPage(params.get('page'))
    const sort = queryStringToSort(params.get('sort'))
    // const search = queryStringToSearch(params.get('search'))
    const search = params.get('search')
    const selectedActivityId = params.get('open')
    return { page, sort, search, selectedActivityId, contactId: contactId || '' }
}

export default useAppUrlParams
