import { AxiosInstance } from 'axios';
import { perPage } from 'contacts-app/constants/constants'
import get from 'lodash/get'
import uniq from 'lodash/uniq'
import { User } from 'types';
import { presentUser } from './fetch-users.api'

interface Input {
  userIds: string[];
  http: AxiosInstance;
}

const fetchUsersById = async ({ 
  userIds = [],
  http
}: Input): Promise<User[]> => {
  const uniqueIds = uniq(userIds).filter(Boolean)
  const response = await http.get('/graph/users', {
    params: {
      page: 1,
      per_page: perPage,
      filter: uniqueIds.map(id => `user_id eq '${id}'`).join(' or '),
      order_by: 'name'
    }
  })
  const users = get(response, 'data._embedded.users', [])
    .filter(Boolean)
    .map(presentUser)

  return users
}

export default fetchUsersById
