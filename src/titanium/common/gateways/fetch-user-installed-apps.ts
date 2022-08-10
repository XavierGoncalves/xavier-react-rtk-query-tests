import { AxiosInstance } from "axios"

interface App {
  id: string;
  name: string;
  slug: string;
}

interface AppListResponse {
  data: {
    viewer: {
      apps: App[]
    }
  }
}

export const fetchUserInstalledApps = async (http: AxiosInstance) => {
  const {
    data: {
      data: {
        viewer: { apps }
      }
    }
  } = await http.post<AppListResponse>('/marketplace/graphql', {
    operationName: 'GetMyApps',
    query: `{
                viewer {
                  apps(appType: "atlas") {
                    id
                    name: displayName
                    slug
                  }
                }
              }
            `
  })
  return presentUserInstalledApps(apps)
}

const presentUserInstalledApps = (apps: App[]): string[] => apps.map(({ slug }) => slug)
