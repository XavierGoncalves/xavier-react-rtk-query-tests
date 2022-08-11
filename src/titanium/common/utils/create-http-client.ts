import HttpClient from "./http.client";

export const createHttpClient = async (atlasSdk) => {
    const { apiGatewayUrl } = await atlasSdk.environment.getConfig()
    return HttpClient.getInstance(apiGatewayUrl)
}
