import { AxiosInstance } from "axios"
import { _Links } from "types";



interface AccountResponse {
    company_name: string;
    created_at: string;
    id: string;
    name: string;
    timezone: string;
    _links: _Links
}

export interface Account {
    id: string;
    name: string;
    slug: string;
    timezone: string;
}

export const fetchAccount = async (http: AxiosInstance) => {
    const { data } = await http.get<AccountResponse>('/account')

    return {account: presentAccount(data)}
}

const presentAccount = (account): Account => ({
    id: account.id,
    slug: account.name,
    name: account.company_name,
    timezone: account.timezone
})
