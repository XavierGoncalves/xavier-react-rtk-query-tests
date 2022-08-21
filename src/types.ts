export { };
declare global {
  interface Window {
    env;
  }
}

export type I18nConfiguration = {
  changeLanguage: (props: ChangeLanguageProps) => void;
};

export type Generator = () => Promise<string>;

type ChangeLanguageProps = {
  language: string;
};

export type AppType = {
  [key: string]: any
}


export type _Links = {
  self: {
    href: string;
  }
}

export interface SortType {
  field: string;
  direction: string;
}

export type onSortFn = (field: string, direction: string) => void
export type onSearchFn = (query: string) => void;

export interface CustomField {
  key: string;
  type: string;
}

export interface ContactCustomField {
  key: string;
  value: string;
}

export interface ActivityContact {
  id: string;
  name: string;
  number: string;
  initials: string;
  deleted?: boolean;
}

export interface ActivityAgent {
  id: string | null;
  name: string | null;
}

export interface ActivityNumber {
  id: string;
  name: string | null;
  number: string;
  friendlyName?: string;
}
export interface Activity {
  id: string;
  interactionId: string;
  type: string;
  agent: ActivityAgent;
  contact: ActivityContact;
  number: ActivityNumber;
  date: string;
  ringGroups: string[];
  duration: number;
  account_id: string;
  channel_type?: string;
  ivr?: string[];
}

export interface OrderBy {
  field: string;
  direction: string;
}

export interface ActivityFilters {
  agent: ActivityAgentFilter;
  contact: ActivityContactFilter;
  ringGroups: string[];
  type: string;
  via: string;
  when: string;
}

export enum ActivityFiltersActionTypes {
  RESET_FILTERS = "RESET_FILTERS",
  SET_ACTIVITY_TYPE = "SET_ACTIVITY_TYPE",
  SET_CONTACT = "SET_CONTACT",
  SET_AGENT = "SET_AGENT",
  SET_WHEN = "SET_WHEN",
  SET_RING_GROUP = "SET_RING_GROUP"
}

export type SetActivityFilterAction = {
  type: ActivityFiltersActionTypes.RESET_FILTERS;
  payload: ActivityFilters;
} | {
  type: ActivityFiltersActionTypes.SET_ACTIVITY_TYPE;
  payload: { type: string };
} | {
  type: ActivityFiltersActionTypes.SET_CONTACT;
  payload: { contact: ActivityContactFilter };
} | {
  type: ActivityFiltersActionTypes.SET_AGENT;
  payload: { agent: ActivityAgentFilter };
} | {
  type: ActivityFiltersActionTypes.SET_WHEN;
  payload: { when: string };
} | {
  type: ActivityFiltersActionTypes.SET_RING_GROUP;
  payload: { ringGroups: string[] };
}


export interface ActivityAgentFilter {
  id: string;
  name: string | null;
}

export interface ActivityContactFilter {
  id: string;
  label: string | null;
}

export interface VoicemailsContactFilter {
  id: string;
  label: string | null;
}

export interface ActivityAppliedFilter {
  name: string;
  label: string;
  values: ActivityAppliedFilterValue[]
}

export interface ActivityAppliedFilterValue {
  value: string;
  label: string;
  translate?: boolean;
}

export type onEditContactFn = ({ id, number }: EditContactInput) => void;
export interface EditContactInput {
  id: string | null;
  number: string | null;
}

export interface User {
  id: string;
  name: string;
}

export interface RingGroup {
  name: string
}

export interface VoicemailStatus {
  value: string;
  loading: boolean;
}

export interface VoicemailRecording {
  id: string;
  index: number;
  duration: number;
  src: string | null;
  active?: boolean;
}

export interface VoicemailRecordings {
  status: string;
  items: VoicemailRecording[];
}

export interface VoicemailContact {
  id: string;
  name: string | null;
  initials: string;
}


export interface Voicemail {
  id: string;
  date: string;
  duration: number;
  talkdeskPhoneNumber: string;
  contactPhoneNumber: string;
  contactId: string;
  assignedTo: string;
  ringGroups: string[];
  status: VoicemailStatus;
  phoneNumberId: string;
  recordings: VoicemailRecordings;
  contact: VoicemailContact;
}


export enum VoicemailsFiltersActionTypes {
  RESET_FILTERS = "RESET_FILTERS",
  SET_STATUS_TYPE = "SET_STATUS_TYPE",
  SET_CONTACT = "SET_CONTACT",
  SET_ASSIGNED_TO = "SET_ASSIGNED_TO",
  SET_WHEN = "SET_WHEN",
  SET_RING_GROUP = "SET_RING_GROUP",
  SET_DURATION = "SET_DURATION"
}

export interface VoicemailsFilters {
  voicemailStatus: string;
  contact: VoicemailsContactFilter;
  assignedTo: string;
  ringGroups: string[];
  via: string;
  when: string;
  duration: string
}

export type SetVoicemailsFilterAction = {
  type: VoicemailsFiltersActionTypes.RESET_FILTERS;
  payload: VoicemailsFilters;
} | {
  type: VoicemailsFiltersActionTypes.SET_STATUS_TYPE;
  payload: { type: string };
} | {
  type: VoicemailsFiltersActionTypes.SET_CONTACT;
  payload: { contact: VoicemailsContactFilter };
} | {
  type: VoicemailsFiltersActionTypes.SET_ASSIGNED_TO;
  payload: { assignedTo: string };
} | {
  type: VoicemailsFiltersActionTypes.SET_WHEN;
  payload: { when: string };
} | {
  type: VoicemailsFiltersActionTypes.SET_RING_GROUP;
  payload: { ringGroups: string[] };
}

interface VoicemailContactEmail {
  label: string;
  email: string;
}

interface VoicemailContactFax {
  label: string;
  number: string;
}

interface VoicemailContactWebsite {
  label: string;
  url: string;
}

interface VoicemailContactPhone {
  label: string;
  number: string;
}

interface VoicemailContactIntegration {
  contact_type: string;
  external_id: string;
  external_sync_state: string;
  external_url: string;
  integration_id: string;
}
export interface VoicemailUseContact {
  account_id: string;
  address: string;
  company: string;
  created_at: string;
  custom_fields: ContactCustomField;
  deleted_at: string | null;
  emails: VoicemailContactEmail[];
  faxes: VoicemailContactFax[];
  id: string;
  industry: string;
  integrations: VoicemailContactIntegration[];
  location: string;
  name: string;
  phones: VoicemailContactPhone[];
  photo_url: string;
  scope: string[];
  social: string[];
  tags: string[];
  title: string;
  updated_at: string;
  websites: VoicemailContactWebsite[]
  _links: _Links
}
