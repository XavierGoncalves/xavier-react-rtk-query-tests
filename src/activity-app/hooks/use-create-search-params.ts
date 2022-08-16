import { parse, stringify } from "qs"
import { useLocation } from "react-router-dom"

const useCreateSearchParams = () => {
  const { pathname, search } = useLocation()

  const createUrl = params => {
    const defaultParams = { page: undefined, open: undefined }
    
    const newSearch = {
      ...defaultParams,
      ...parse(search, {
        ignoreQueryPrefix: true,

      }),
      ...params
    }
    const queryString = stringify(newSearch, {
      addQueryPrefix: true
    })
    return pathname + queryString
  }

  return createUrl
}

export default useCreateSearchParams
