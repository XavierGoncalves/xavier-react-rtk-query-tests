import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import pick from 'lodash/pick'
import get from 'lodash/get'
import { getInitials } from 'titanium/common/utils/get-initials'
import { AxiosInstance } from 'axios'
import { perPage } from 'contacts-app/constants/constants'
import { SortType, _Links } from 'types'

interface Inputs {
    page: number;
    sort: SortType;
    search: string | null;
    http: AxiosInstance;
}

interface CustomField {
    key: string;
    value: string;
}

export interface Contact {
    address: string;
    company: string;
    customFields: CustomField[];
    emails: string[];
    faxes: string[];
    id: string;
    industry: string;
    initials: string;
    location: string;
    name: string;
    phones: string[];
    photoUrl: string;
    tags: string[];
    title: string;
    websites: string[]
}

interface ServerEmail {
    label: string;
    email: string
}
type ServerFax = ServerPhone
interface ServerPhone {
    label: string;
    number: string
}

interface ServerWebsite {
    url: string
}

interface ServerIntegration {
    contact_type: string;
    external_id: string;
    external_sync_state: string;
    external_url: string;
    integration_id: string;
}

export interface GetContactServerResponse {
    account_id: string;
    address: string;
    company: string;
    created_at: string;
    custom_fields: CustomField[];
    deleted_at: string | null;
    emails: ServerEmail[];
    faxes: ServerFax[];
    id: string;
    industry: string;
    integrations: ServerIntegration[];
    location: string;
    name: string;
    phones: ServerPhone[];
    photo_url: string;
    scope: string[];
    social: string[];
    tags: string[];
    title: string;
    websites: ServerWebsite[];
    _links: _Links
}

export interface ReturnInterface { 
    contacts: Contact[];
    count: number;
    total: number; 
    totalPages: number;
}


export const fetchContacts = async ({
    page = 1,
    sort,
    search = null,
    http
}: Inputs): Promise<ReturnInterface> => {
    const {direction, field} = sort
    const sortString =  `${direction === 'desc' ? '-' : ''}${field}`;
    const params = new URLSearchParams(
        omitBy({ page, per_page: perPage, sort: sortString }, isNil)
    )
    let result

    if (search) {
        const searchNumber = search
            .split('')
            .filter(c => c !== '-' && c !== ' ')
            .join('')

        const searchQueryEncoded = encodeURIComponent(search)
        const searchNumberEncoded = encodeURIComponent(searchNumber)

        const nameFilter = `contains(name, '${searchQueryEncoded}')`
        const emailFilter = `contains(email, '${searchQueryEncoded}')`
        const companyFilter = `contains(company, '${searchQueryEncoded}')`
        const phoneFilter = `contains(phone, '${searchNumberEncoded}')`
        const faxFilter = `contains(fax, '${searchNumberEncoded}')`

        const filterPartialUrl = [nameFilter, emailFilter, phoneFilter, companyFilter, faxFilter].join(' or ')
        result = await http.get(
            `/callbar/contacts?$filter=${filterPartialUrl}&${params}`
        )
    } else {
        result = await http.get(
            `/callbar/contacts?${params}`
        )
    }

    // await new Promise(r => setTimeout(r, 3000));
    const contacts: Contact[] = get(result, 'data._embedded.contacts', []).map(contact =>
        presentContact(contact)
    )
    const count: number = get(result, 'data.count', 0)
    const total: number = get(result, 'data.matched', 0)
    const totalPages: number = Math.ceil(total / perPage)

    return { contacts, count, total, totalPages }
}

const presentContact = contact => ({
    ...pick(contact, [
        'id',
        'name',
        'company',
        'address',
        'industry',
        'location',
        'title',
        'tags'
    ]),
    initials: getInitials(contact.name),
    photoUrl: contact.photo_url,
    phones: get(contact, 'phones', []).map(phone => phone.number),
    faxes: get(contact, 'faxes', []).map(fax => fax.number),
    emails: get(contact, 'emails', []).map(email => email.email),
    websites: get(contact, 'websites', []).map(website => website.url),
    customFields: contact.custom_fields
})
