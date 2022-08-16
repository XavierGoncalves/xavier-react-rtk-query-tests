import presentContact from "./presentContact"
import presentNumber from "./presentNumber"

const presentActivity = (activity) => {
  const {
    id,
    interaction_id,
    type,
    user_id,
    user_name,
    started_at,
    ring_groups,
    duration,
    account_id,
    external_integration
  } = activity
  return {
    id: id,
    interactionId: interaction_id,
    type: type,
    agent: { id: user_id, name: user_name },
    contact: presentContact(activity, type),
    number: presentNumber(activity, type),
    date: started_at,
    ringGroups: Array.isArray(ring_groups)
      ? ring_groups
      : ring_groups
      ? JSON.parse(ring_groups)
      : [],
    duration: duration,
    account_id: account_id,
    channel_type: external_integration?.channel_type
  }
}

export default presentActivity
