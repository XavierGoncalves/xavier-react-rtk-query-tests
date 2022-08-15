import { createMemoryHistory, MemoryHistory } from 'history'

// export const createHistory = (initialPath?: string) => {
//   const options = initialPath
//     ? {
//         initialEntries: [initialPath],
//         initialIndex: 0
//       }
//     : {}

//   return createMemoryHistory(options)
// }

export const createHistoryForAtlas = (atlasSdk, initialPath?: string) => {
  const history: MemoryHistory = createMemoryHistory()

  history.listen(({location}) => {
    atlasSdk.navigation.triggerAppPathChange({
      path: location.pathname,
      search: location.search
    })
  })

  return history
}
