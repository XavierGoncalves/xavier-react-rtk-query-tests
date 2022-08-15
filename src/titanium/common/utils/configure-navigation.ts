import { createHistoryForAtlas } from "./history"

export const configureNavigation = (navigationEnabled, atlasSdk) => {
  if (!navigationEnabled) {
    return
  }
  let history = createHistoryForAtlas(atlasSdk)
  registerOnPathChanged(atlasSdk, history)
  return history
}

const registerOnPathChanged = (atlasSdk, history) => {
  atlasSdk.navigation.onContainerPathChange(({ path, search }) => {
    const fullPath = path + search

    if (history.path !== fullPath) {
      history.push(fullPath)
    }
  })
}
