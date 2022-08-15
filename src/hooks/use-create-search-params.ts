import { parse, stringify } from "qs"
import { useCallback } from "react"
import { useHistory } from "react-router-dom"
import useAppUrlParams from "./use-search-params"

const useCreateSearchParams = () => {

  const history = useHistory()
  const { page, search, sort } = useAppUrlParams()

  // const createUrl = params => {
  //   console.log('createUrl-----------------------------')
  //   console.log('createUrl-params-', params)
  //   console.log('createUrl-search-', location.search)
  //   console.log('createUrl-pathname-', location.pathname)
  //   const newSearch = {
  //     ...parse(location.search, {
  //       ignoreQueryPrefix: true
  //     }),
  //     ...defaultParams,
  //     ...params
  //   }
  //   console.log('createUrl-newSearch-', newSearch)
  //   const queryString = stringify(newSearch, {
  //     addQueryPrefix: true
  //   })
  //   console.log('createUrl-', location.pathname + queryString)
  //   //tem que dar: /?search=valeria
  //   //tem que dar: /?search=valeria&sort=-name
  //   //tem que dar: /?search=valeria&sort=-name&page=2
  //   return location.pathname + queryString
  // }

  const createUrl = useCallback(params => {
    const defaultParams = { page: undefined, open: undefined }
    console.log('createUrl-----------------------------')
    console.log('createUrl-params-', params)
    console.log('createUrl-history.location.search-', history.location.search)
    console.log('createUrl-history.location.pathname-', history.location.pathname)
    console.log('createUrl-page-', page)
    console.log('createUrl-search-', search)
    console.log('createUrl-sort-', sort)
    const newSearch = {
      ...defaultParams,
      ...parse(history.location.search, {
        ignoreQueryPrefix: true
      }),
      ...params
    }
    console.log('createUrl-newSearch-', newSearch)
    const queryString = stringify(newSearch, {
      addQueryPrefix: true
    })
    console.log('createUrl-', history.location.pathname + queryString)
    //tem que dar: /?search=valeria
    //tem que dar: /?search=valeria&sort=-name
    //tem que dar: /?search=valeria&sort=-name&page=2
    return history.location.pathname + queryString
  }, [history])

  return createUrl
}

export default useCreateSearchParams
