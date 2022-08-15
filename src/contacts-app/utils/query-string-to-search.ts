import { parse } from "qs"

const queryStringToSearch = query => {
    const { search } = parse(query, { ignoreQueryPrefix: true })
    
    console.log('queryStringToSearch', search)
    return search?.toString() || null
}
export default queryStringToSearch
