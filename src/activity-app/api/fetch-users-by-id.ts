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

interface Output {
  [key: string]: User
}

const fetchUsersById = async ({ 
  userIds = [],
  http
}: Input): Promise<Output> => {
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

  return groupById(users)
}

const groupById = users =>
  users.reduce(
    (usersById, user) => ({
      ...usersById,
      [user.id]: user
    }),
    {}
  )

export default fetchUsersById
