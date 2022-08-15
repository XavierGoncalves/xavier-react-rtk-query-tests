import { AxiosInstance } from "axios";
import get from 'lodash/get'

interface Input {
    contactId: string;
    http: AxiosInstance
}

const deleteContact = async ({ contactId, http }: Input) => {
    const response = await http.delete(`callbar/contacts/${contactId}`)
    return get(response, 'data.deleted', 0) > 0 as boolean
}

export default deleteContact
