import { AxiosInstance } from "axios"
import { _Links } from "types";

interface UserResponse {
  email: string;
  id: string;
  name: string;
  sub: string;
  _links: _Links 
}

export interface User {
  email: string;
  id: string;
  name: string;
}

export const fetchCurrentUser = async (http: AxiosInstance) => {
    const { data } = await http.get<UserResponse>('/users/me')
  
    return presentUser(data)
  }
  
  const presentUser = (user): User => ({
    id: user.id,
    email: user.email,
    name: user.name
  })
