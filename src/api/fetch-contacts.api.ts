import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import pick from 'lodash/pick'
import get from 'lodash/get'
import { getInitials } from 'titanium/common/utils/get-initials'
import { AxiosInstance } from 'axios'
import { perPage } from 'constants/constants'

interface Inputs {
    page: number,
    sort: string,
    search: string | null,
    http: AxiosInstance
}

interface CustomField {
    key: string;
    value: string;
}

export interface Contact {
    address: string;
    company: string;
    customFields: CustomField[]
    emails: string[]
    faxes: string[]
    id: string;
    industry: string;
    initials: string;
    location: string;
    name: string;
    phones: string[]
    photoUrl: string;
    tags: string[]
    title: string;
    websites: string[]
}

export interface ReturnInterface { 
    contacts: Contact[];
    count: number;
    total: number; 
    totalPages: number;
}


export const fetchContacts = async ({
    page = 1,
    sort = 'name',
    search = null,
    http
}: Inputs): Promise<ReturnInterface> => {
    const params = new URLSearchParams(
        omitBy({ page, per_page: perPage, sort }, isNil)
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
        const phoneFilter = `contains(phone, '${searchNumberEncoded}')`
        const companyFilter = `contains(company, '${searchQueryEncoded}')`
        const faxFilter = `contains(fax, '${searchNumberEncoded}')`

        result = await http.get(
            `/callbar/contacts?$filter=contains(name, '${searchQueryEncoded}') or contains(email, '${searchQueryEncoded}') or contains(phone, '${searchNumberEncoded}') or contains(company, '${searchQueryEncoded}') or contains(fax, '${searchNumberEncoded}')&${params}`
        )
    } else {
        result = await http.get(
            `/callbar/contacts?${params}`
        )
    }

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
