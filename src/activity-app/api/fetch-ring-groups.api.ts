import { AxiosInstance } from 'axios';
import get from 'lodash/get'
import { RingGroup } from 'types';

interface Input {
    searchText: string | null;
    http: AxiosInstance
}

interface Output {
    ringGroups: RingGroup[];
    total: number;
}

const fetchRingGroups = async ({
    searchText = null,
    http
}: Input): Promise<Output> => {
    const response = await http.get('ring-groups', {
        params: {
            page: 1,
            per_page: 20,
            name: searchText,
            order_by: 'name'
        }
    })

    const ringGroups = presentRingGroups(
        get(response, 'data._embedded.ring_groups', [])
    )
    const total = get(response, 'data.total')

    return { ringGroups, total }
}

const presentRingGroups = ringGroups =>
    ringGroups.map(ringGroup => ({
        name: ringGroup.name
    }))

export default fetchRingGroups
