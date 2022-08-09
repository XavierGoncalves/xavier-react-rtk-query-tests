import HttpClient from "./http.client";

export const createHttpClient = async (scopes, atlasSdk) => {
    const { apiGatewayUrl } = await atlasSdk.environment.getConfig()
    return HttpClient.getInstance(apiGatewayUrl)
}
