import { Contact } from "contacts-app/api/fetch-contacts.api"

const toApiModel = (contact: Contact) => {
  const {
    photoUrl,
    emails = [],
    phones = [],
    faxes = [],
    websites = [],
    ...contactInfo
  } = contact

  return {
    ...contactInfo,
    photo_url: photoUrl,
    emails: emails.map(email => ({ email })),
    phones: phones.map(number => ({ number })),
    faxes: faxes.map(number => ({ number })),
    websites: websites.map(url => ({ url }))
  }
}
export default toApiModel
