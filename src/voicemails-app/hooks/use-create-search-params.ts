
import { parse, stringify } from "qs"
import { useLocation } from "react-router-dom"
import { ROOT_URL } from "voicemails-app/constants/url.constants"

const useCreateSearchParams = () => {
  const { pathname, search } = useLocation()

  const createUrl = params => {
    // const defaultParams = { page: undefined, open: undefined }

    const newSearch = {
      // ...defaultParams,
      ...parse(search, {
        ignoreQueryPrefix: true,

      }),
      ...params
    }
    const queryString = stringify(newSearch, {
      addQueryPrefix: true
    })
    // console.log('createUrl - pathname->', pathname)
    // console.log('createUrl - queryString->', queryString)
    return pathname + queryString
  }

  const createUrlFromRoot = params => {
    // const defaultParams = { page: undefined, open: undefined }

    const newSearch = {
      // ...defaultParams,
      // ...parse(search, {
      //   ignoreQueryPrefix: true,
      // }),
      ...params
    }
    const queryString = stringify(newSearch, {
      addQueryPrefix: true
    })
    console.log('createUrlFromRoot - queryString->', queryString)
    return ROOT_URL + queryString
  }

  return { createUrl, createUrlFromRoot }
}

export default useCreateSearchParams
