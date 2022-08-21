import { AxiosInstance } from 'axios';
import { perPage } from 'contacts-app/constants/constants'
import get from 'lodash/get'
import presentUser from 'voicemails-app/utils/present-user'

interface Input {
    page: number;
    query: string | null;
    http: AxiosInstance
}

const fetchUsersApi = async ({
    page = 1,
    query = null,
    http
}: Input) => {
    const response = await http.get('/graph/users', {
        params: {
            page,
            per_page: perPage,
            order_by: 'name',
            filter: query ? `contains(name, '${query}')` : null
        }
    })

    const users = get(response, 'data._embedded.users', []).map(presentUser)

    const totalUsers = get(response, 'data.total')

    return { data: users, total: totalUsers }
}

export default fetchUsersApi
