import get from 'lodash/get'
import pick from 'lodash/pick'
import { getInitials } from 'titanium/common/utils/get-initials'

const fromApiModel = contact => ({
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
  customFields: get(contact, 'custom_fields', [])
})

export default fromApiModel
