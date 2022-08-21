export const LOADING = 'STATE_LOADING'
export const LOADING_PAGE = 'STATE_LOADING_PAGE'
export const ERROR = 'STATE_ERROR'
export const NO_RESULTS = 'STATE_NO_RESULTS'
export const NO_FILTERED_RESULTS = 'STATE_NO_FILTERED_RESULTS'
export const NO_ASSIGNED_VOICEMAILS = 'STATE_NO_ASSIGNED_VOICEMAILS'
export const SUCCESS = 'STATE_SUCCESS'
export const READY = 'STATE_READY'
export const UNAUTHORIZED = 'STATE_UNAUTHORIZED'
export const DELETED = 'STATE_DELETED'
export const UNINITIALIZED = 'STATE_UNINITIALIZED'

export const VOICEMAIL_RESOLVED = 'STATE_VOICEMAIL_RESOLVED'
export const VOICEMAIL_OPEN = 'STATE_VOICEMAIL_OPEN'

export const EMPTY_STATES = [
  ERROR,
  NO_RESULTS,
  NO_FILTERED_RESULTS,
  NO_ASSIGNED_VOICEMAILS
]
export const ALL_TABLE_STATES = [...EMPTY_STATES, LOADING, LOADING_PAGE, READY]
export const ALL_RECORDINGS_STATES = [
  LOADING,
  ERROR,
  READY,
  UNAUTHORIZED,
  DELETED,
  UNINITIALIZED
]
export const ALL_TRANSCRIPTION_STATES = [LOADING, ERROR, NO_RESULTS, READY]
