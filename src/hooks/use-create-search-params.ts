import { parse, stringify } from "qs"
import { useCallback } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import useAppUrlParams from "./use-search-params"

const useCreateSearchParams = () => {
  const defaultParams = { page: undefined, open: undefined }

  const location = useLocation()

  const createUrl = params => {
    console.log('createUrl-----------------------------')
    console.log('createUrl-params-', params)
    console.log('createUrl-search-', location.search)
    console.log('createUrl-pathname-', location.pathname)
    const newSearch = {
      ...parse(location.search, {
        ignoreQueryPrefix: true
      }),
      ...defaultParams,
      ...params
    }
    console.log('createUrl-newSearch-', newSearch)
    const queryString = stringify(newSearch, {
      addQueryPrefix: true
    })
    console.log('createUrl-', location.pathname + queryString)
    //tem que dar: /?search=valeria
    //tem que dar: /?search=valeria&sort=-name
    //tem que dar: /?search=valeria&sort=-name&page=2
    return location.pathname + queryString
  }

  // const createUrl = useCallback(params => {
  //   debugger
  //   const defaultParams = { page: undefined, open: undefined }
  //   console.log('createUrl-----------------------------')
  //   console.log('createUrl-params-', params)
  //   console.log('createUrl-search-', search)
  //   console.log('createUrl-pathname-', pathname)

  //   debugger
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
  // }, [search, pathname])

  return createUrl
}

export default useCreateSearchParams
