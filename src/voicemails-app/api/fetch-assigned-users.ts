import uniq from 'lodash/uniq'
import get from 'lodash/get'
import presentUser from 'voicemails-app/utils/present-user'
import { AxiosInstance } from 'axios';
import { perPage } from 'contacts-app/constants/constants';

interface Input {
    userIds?: string[];
    http: AxiosInstance
}

const fetchAssignedUsersApi = async ({
    userIds = [],
    http
}: Input) => {
    const uniqueIds = uniq(userIds).filter(Boolean)
    if (uniqueIds.length === 0) {
        return { data: [] }
    }

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

export default fetchAssignedUsersApi
