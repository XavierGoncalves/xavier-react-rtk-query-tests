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

export interface Filters {
  agent: AgentFilter;
  contact: ContactFilter;
  ringGroups: string[];
  type: string;
  via: string;
  when: string;
}

export enum ActionTypes {
  RESET_FILTERS = "RESET_FILTERS",
  SET_ACTIVITY_TYPE = "SET_ACTIVITY_TYPE",
  SET_CONTACT = "SET_CONTACT",
  SET_AGENT = "SET_AGENT",
  SET_WHEN = "SET_WHEN",
  SET_RING_GROUP = "SET_RING_GROUP"
}

export type SetFilterAction = {
  type: ActionTypes.RESET_FILTERS;
  payload: Filters;
} | {
  type: ActionTypes.SET_ACTIVITY_TYPE;
  payload: { type: string };
} | {
  type: ActionTypes.SET_CONTACT;
  payload: { contact: ContactFilter };
} | {
  type: ActionTypes.SET_AGENT;
  payload: { agent: AgentFilter };
} | {
  type: ActionTypes.SET_WHEN;
  payload: { when: string };
} | {
  type: ActionTypes.SET_RING_GROUP;
  payload: { ringGroups: string[] };
}


export interface AgentFilter {
  id: string;
  name: string | null;
}

export interface ContactFilter {
  id: string;
  label: string | null;
}

export interface AppliedFilter {
  name: string;
  label: string;
  values: AppliedFilterValue[]
}

export interface AppliedFilterValue {
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


/* 
id: data.id,
date: data.created_at,
duration: data.duration,
talkdeskPhoneNumber: data.talkdesk_phone_number,
contactPhoneNumber: data.contact_phone_number,
contactId: data.contact_id,
assignedTo: data.user_id,
ringGroups: data.ring_groups || [],
status: {
    value: data.resolved
        ? VOICEMAIL_RESOLVED
        : VOICEMAIL_OPEN,
    loading: false
},
phoneNumberId: get(data, 'number_id', null),
recordings: { status: UNINITIALIZED, items: [] } 
*/
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
