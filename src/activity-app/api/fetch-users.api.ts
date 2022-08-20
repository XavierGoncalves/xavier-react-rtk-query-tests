import { AxiosInstance } from 'axios';
import get from 'lodash/get'
import { User } from 'types';

interface Input {
    searchText: string | null;
    http: AxiosInstance
}

interface Output { 
    users: User[];
    total: number;
}

const fetchUsersApi = async ({
    searchText = null,
    http
}: Input): Promise<Output> => {
    const response = await http.get('/graph/users', {
        params: {
            page: 1,
            per_page: 20,
            order_by: 'name',
            filter: searchText ? `contains(name, '${searchText}')` : null
        }
    })
    const users: User[] = get(response, 'data._embedded.users', []).map(presentUser)
    const total = get(response, 'data.total')

    return { users, total }
}

export const presentUser = user => ({
    id: user.id,
    name: user.name
})

export default fetchUsersApi
