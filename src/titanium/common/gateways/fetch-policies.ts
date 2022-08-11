import { AxiosInstance } from "axios"

interface PolicyResponse {
  success: string;
  target_policy: string;
}

export interface Policies {
  [key: string]: string;
}


export const fetchPolicies = async (policies , http: AxiosInstance) => {
    const { data } = await http.post<PolicyResponse[]>('/policies/evaluate/bulk', {
      policies
    })
  
    return data.reduce<Policies>((acc, item) => {
      acc[item.target_policy] = item.success
      return acc
    }, {})
  }
  