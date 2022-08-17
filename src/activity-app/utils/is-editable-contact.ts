import { ActivityContact } from "types"

const isEditableContact = (contact: ActivityContact, canUpdateContact: boolean = false) => {
  const contactExists = !!contact
  const hasId = contactExists && contact.id
  const wasDeleted = contactExists && contact.deleted

  return Boolean(contactExists && hasId && !wasDeleted && canUpdateContact)
}

export default isEditableContact
