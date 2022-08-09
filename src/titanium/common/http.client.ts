import axios, { AxiosInstance } from 'axios'
import TokenGenerator from './token.generator'

class HttpClient {
  private static axiosInstance: AxiosInstance;

  private constructor() { }

  public static getInstance(baseUrl?: string) {
    if (!HttpClient.axiosInstance) {
      HttpClient.axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: 5000
      });

      HttpClient.axiosInstance.interceptors.request.use(async function tokenInterceptor(config) {
        const accessToken = await TokenGenerator.get();

        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`
          }
        }
      });
    }
    return HttpClient.axiosInstance
  }
}

export default HttpClient;
