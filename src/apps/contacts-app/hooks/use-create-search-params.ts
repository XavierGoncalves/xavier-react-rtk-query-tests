import { parse, stringify } from "qs"
import { useCallback } from "react"
import { useLocation } from "react-router-dom"


const useCreateSearchParams = () => {
  const { pathname, search } = useLocation()

  const createUrl = useCallback(params => {
    const defaultParams = { page: undefined, open: undefined }

    const newSearch = {
      ...parse(search, {
        ignoreQueryPrefix: true
      }),
      ...defaultParams,
      ...params
    }
    const queryString = stringify(newSearch, {
      addQueryPrefix: true
    })
    return pathname + queryString
  }, [search, pathname])

  return createUrl
}

export default useCreateSearchParams
