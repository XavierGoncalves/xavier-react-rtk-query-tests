import fromApiModel from "contacts-app/utils/from-api-model"
import toApiModel from "contacts-app/utils/to-api-model"
import get from 'lodash/get'
import { Contact } from "./fetch-contacts.api"

const updateContact = async ({contact, http}) => {
    const newContact = toApiModel(contact)
    const response = await http.patch(`callbar/contacts/${contact.id}`, {
        contact: newContact
    })
    return fromApiModel(get(response, 'data.contact', {})) as Contact
}

export default updateContact
