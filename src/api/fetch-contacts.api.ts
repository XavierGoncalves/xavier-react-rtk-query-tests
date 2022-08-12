import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import pick from 'lodash/pick'
import get from 'lodash/get'
import { getInitials } from 'titanium/common/utils/get-initials'

export const fetchContacts = async ({
    page = 1,
    perPage = 10,
    sort = 'name',
    searchQuery,
    http
  }) => {
    const params = new URLSearchParams(
      omitBy({ page, per_page: perPage, sort }, isNil)
    )
  
    let result
  
    if (searchQuery) {
      const searchNumber = searchQuery
        .split('')
        .filter(c => c !== '-' && c !== ' ')
        .join('')
  
      const searchQueryEncoded = encodeURIComponent(searchQuery)
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
  
    const contacts = get(result, 'data._embedded.contacts', []).map(contact =>
      presentContact(contact)
    )
    const count = get(result, 'data.count', 0)
    const total = get(result, 'data.matched', 0)
    const totalPages = Math.ceil(total / perPage)
    const hasSearch = !!searchQuery
  
    return { contacts, count, total, totalPages, hasSearch }
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
