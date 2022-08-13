export const apiScopes = [
    'account:read',
    'contact-details:read',
    'contact-details:write',
    'contacts-activities:read',
    'graph-users:read',
    'numbers:read',
    'openid',
    'policies:evaluate',
    'recordings:read',
    'account-favorites:read',
    'account-custom-fields:read',
    'apps:graphql'
]

export const RECORDINGS_LISTEN_POLICY = 'calls.recordings.listen'
export const CONTACTS_CREATE_POLICY = 'contacts.create'
export const CONTACTS_UPDATE_POLICY = 'contacts.update'
export const CONTACTS_DELETE_POLICY = 'contacts.delete'
export const policies = [
    RECORDINGS_LISTEN_POLICY,
    CONTACTS_CREATE_POLICY,
    CONTACTS_UPDATE_POLICY,
    CONTACTS_DELETE_POLICY
]

export const perPage = 10
export const CREATE_CONTACT_URL = '/create'
export const VIEW_CONTACT_URL = '/view/:id'
export const EDIT_CONTACT_URL = '/edit/:id'

export const LOADING = 'LOADING'
export const EMPTY = 'EMPTY'
export const EMPTY_FAVORITES = 'EMPTY_FAVORITES'
export const ERROR = 'ERROR'
export const ERROR_FAVORITES = 'ERROR_FAVORITES'
export const READY = 'READY'
export const NO_RESULTS = 'NO_RESULTS'
export const NO_FILTERED_RESULTS = 'NO_FILTERED_RESULTS'

export const EMPTY_STATES = [
  EMPTY,
  EMPTY_FAVORITES,
  ERROR,
  ERROR_FAVORITES,
  NO_RESULTS,
  NO_FILTERED_RESULTS
]
export const ALL_TABLE_STATES = [...EMPTY_STATES, READY, LOADING]
