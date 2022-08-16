const presentContact = (activity, type) => {
  const { contact_person_id, contact_number, external_integration } = activity
  const { contact_person_channel_id } = external_integration || {}

  const digitalInteraction = {
    id: contact_person_id,
    name: null,
    number: contact_person_channel_id,
    initials: null
  }

  const defaultActivity = {
    id: contact_person_id,
    name: null,
    number: contact_number,
    initials: null
  }

  return (
    {
      INBOUND: defaultActivity,
      MISSED_INBOUND: defaultActivity,
      OUTBOUND: defaultActivity,
      UNANSWERED_OUTBOUND: defaultActivity,
      INBOUND_CONSULTATION: defaultActivity,
      OUTBOUND_CONSULTATION: defaultActivity,
      ABANDONED: defaultActivity,
      TRANSFER: defaultActivity
    }[type] || digitalInteraction
  )
}

export default presentContact
