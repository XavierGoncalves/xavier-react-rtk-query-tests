import { createMemoryHistory } from 'history'

export const createHistoryForAtlas = (atlasSdk) => {
  const history = createMemoryHistory()

  history.listen(location => {
    atlasSdk.navigation.triggerAppPathChange({
      path: location.pathname,
      search: location.search
    })
  })

  return history
}
