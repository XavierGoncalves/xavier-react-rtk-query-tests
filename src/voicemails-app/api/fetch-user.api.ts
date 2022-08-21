import { AxiosInstance } from 'axios';
import { perPage } from 'contacts-app/constants/constants'
import get from 'lodash/get'
import presentUser from 'voicemails-app/utils/present-user'

interface Input {
    page: number;
    id?: string | null;
    http: AxiosInstance;
}

const fetchUserApi = async ({ 
    page = 1, 
    id = null, 
    http 
}: Input) => {
    const response = await http.get('/graph/users', {
        params: {
            page,
            per_page: perPage,
            order_by: 'name',
            filter: `user_id eq '${id}'`
        }
    })

    const user = get(response, 'data._embedded.users', []).map(presentUser)

    return {
        user: user.length ? user[0] : null
    }
}
export default fetchUserApi
