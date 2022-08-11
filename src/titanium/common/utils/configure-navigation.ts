import { MemoryHistory } from "history"
import { createHistoryForAtlas } from "./history"

export const configureNavigation = (navigationEnabled, atlasSdk) => {
  if (!navigationEnabled) {
    return
  }
  let history = createHistoryForAtlas(atlasSdk, '/')
  registerOnPathChanged(atlasSdk, history)
  return history
}

const registerOnPathChanged = (atlasSdk, history: MemoryHistory) => {
  atlasSdk.navigation.onContainerPathChange(({ path, search }) => {
    const atlasUri = '/' + path + search
    const historyUri = history
      ? history.location.pathname + history.location.search
      : '/'
    history.replace(atlasUri === '/' ? historyUri : atlasUri)
  })
}
