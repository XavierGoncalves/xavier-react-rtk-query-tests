import { parse, stringify } from "qs"
import { useLocation } from "react-router-dom"

const useCreateSearchParams = () => {
  const { pathname, search } = useLocation()
  const defaultParams = { page: undefined, open: undefined }

  const createUrl = params => {
    console.log('createUrl-params-', params)
    console.log('createUrl-search-', search)
    console.log('createUrl-pathname-', pathname)
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
    console.log('createUrl-', pathname + queryString)
    //tem que dar: /?search=valeria
    //tem que dar: /?search=valeria&sort=-name
    //tem que dar: /?search=valeria&sort=-name&page=2
    return pathname + queryString
  }

  // const createUrl = useCallback(params => {
  //   console.log('createUrl-params-', params)
  //   console.log('createUrl-search-', search)
  //   console.log('createUrl-pathname-', pathname)
  //   const newSearch = {
  //     ...parse(search, {
  //       ignoreQueryPrefix: true
  //     }),
  //     ...defaultParams,
  //     ...params
  //   }

  //   const queryString = stringify(newSearch, {
  //     addQueryPrefix: true
  //   })
  //   console.log('createUrl-', pathname + queryString)
  //   //tem que dar: /?search=valeria
  //   //tem que dar: /?search=valeria&sort=-name
  //   //tem que dar: /?search=valeria&sort=-name&page=2
  //   return pathname + queryString
  // }, [defaultParams, pathname, search])

  return createUrl
}

export default useCreateSearchParams
