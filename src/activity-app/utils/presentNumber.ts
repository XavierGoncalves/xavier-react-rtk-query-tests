const presentNumber = (activity, type) => {
  const { phone_id, company_number, external_integration } = activity
  const { touchpoint_value } = external_integration || {}
  const digitalInteraction = {
    id: touchpoint_value,
    name: null,
    number: touchpoint_value
  }

  const defaultActvity = {
    id: phone_id,
    name: null,
    number: company_number
  }

  return (
    {
      INBOUND_SMS: digitalInteraction,
      OUTBOUND_SMS: digitalInteraction
    }[type] || defaultActvity
  )
}

export default presentNumber
