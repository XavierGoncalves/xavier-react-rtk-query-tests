export const RECORDINGS_LISTEN_POLICY = 'calls.recordings.listen'

export const CONTACTS_CREATE_POLICY = 'contacts.create'
export const CONTACTS_UPDATE_POLICY = 'contacts.update'
export const CONTACTS_DELETE_POLICY = 'contacts.delete'

export const CALLS_SCOPE_AGENT_POLICY = 'calls.scope.agent'
export const CALLS_SCOPE_ALL_POLICY = 'calls.scope.all'
export const CALLS_SCOPE_RING_GROUP_POLICY = 'calls.scope.ring_group'

export const QM_EVALUATIONS_WRITE_POLICY = 'qm.evaluations.write'

export const VOICEMAILS_ASSIGN_POLICY = 'voicemails.voicemails.assign'
export const VOICEMAILS_SCOPE_AGENT = 'voicemails.scope.agent'
export const VOICEMAILS_SCOPE_ALL = 'voicemails.scope.all'
export const VOICEMAILS_SCOPE_RING_GROUP = 'voicemails.scope.ring_group'

export const policies = [
    RECORDINGS_LISTEN_POLICY,
    CONTACTS_CREATE_POLICY,
    CONTACTS_UPDATE_POLICY,
    CONTACTS_DELETE_POLICY,
    // CALLS_SCOPE_AGENT_POLICY,
    // CALLS_SCOPE_ALL_POLICY,
    // CALLS_SCOPE_RING_GROUP_POLICY,
    QM_EVALUATIONS_WRITE_POLICY,
    VOICEMAILS_ASSIGN_POLICY,
    VOICEMAILS_SCOPE_AGENT,
    VOICEMAILS_SCOPE_ALL,
    VOICEMAILS_SCOPE_RING_GROUP
]
