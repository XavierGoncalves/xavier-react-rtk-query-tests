import { parse, stringify } from "qs"
import { useCallback } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import useAppUrlParams from "./use-search-params"

const useQuery = () => new URLSearchParams(useLocation().search);

const useCreateSearchParams = () => {
  const { pathname, search } = useLocation()
  let [searchParams] = useSearchParams();
  const { page: currentPage, selectedActivityId } = useAppUrlParams()
  const xavierQuery = useQuery();
  // const createUrl = params => {
  //   console.log('createUrl-----------------------------')
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
  //   console.log('createUrl-newSearch-', newSearch)
  //   const queryString = stringify(newSearch, {
  //     addQueryPrefix: true
  //   })
  //   console.log('createUrl-', pathname + queryString)
  //   //tem que dar: /?search=valeria
  //   //tem que dar: /?search=valeria&sort=-name
  //   //tem que dar: /?search=valeria&sort=-name&page=2
  //   return pathname + queryString
  // }

  const createUrl = useCallback(params => {
    debugger
    const defaultParams = { page: undefined, open: undefined }
    console.log('createUrl-----------------------------')
    console.log('createUrl-params-', params)
    console.log('createUrl-search-', search)
    console.log('createUrl-pathname-', pathname)
    console.log('createUrl-searchParams-', JSON.stringify([...searchParams.entries()]))
    console.log('createUrl-currentPage-', currentPage)
    console.log('createUrl-xavierQuery.get("page")-', xavierQuery.get('page'))
    debugger
    const newSearch = {
      ...parse(search, {
        ignoreQueryPrefix: true
      }),
      ...defaultParams,
      ...params
    }
    console.log('createUrl-newSearch-', newSearch)
    const queryString = stringify(newSearch, {
      addQueryPrefix: true
    })
    console.log('createUrl-', pathname + queryString)
    //tem que dar: /?search=valeria
    //tem que dar: /?search=valeria&sort=-name
    //tem que dar: /?search=valeria&sort=-name&page=2
    return pathname + queryString
  }, [search, pathname, searchParams, currentPage, xavierQuery])

  return createUrl
}

export default useCreateSearchParams
