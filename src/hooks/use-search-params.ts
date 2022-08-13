import { useLocation, useSearchParams } from "react-router-dom"
import queryStringToPage from "utils/query-string-to-page"
import queryStringToSearch from "utils/query-string-to-search"
import queryStringToSort from "utils/query-string-to-sort"

const useAppUrlParams = () => {
    const [params] = useSearchParams()

    // const {search}  = useLocation()
    // console.log('useAppUrlParams-useLocation-search-', search)
    // console.log('useAppUrlParams-useSearchParams-params-', params)
    // console.log('useAppUrlParams-params.get-', params.get('search'))

    const page = queryStringToPage(params.get('page'))
    const sort = queryStringToSort(params.get('sort'))
    // const search = queryStringToSearch(params.get('search'))
    const search = params.get('search')
    return { page, sort, search }
}

export default useAppUrlParams
