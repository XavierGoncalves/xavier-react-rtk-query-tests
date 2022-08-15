import { AxiosInstance } from "axios"
import pick from 'lodash/pick'
import get from 'lodash/get'
import { getInitials } from "titanium/common/utils/get-initials"
import { Contact } from "./fetch-contacts.api"

const fetchContact = async (contactID: string, http: AxiosInstance): Promise<Contact> => {
    const result = await http.get(`/callbar/contacts/${contactID}`)

    const contact = presentContact(get(result, 'data.contact'))
  
    return contact
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

export default fetchContact
