import { Atlas } from "@atlas/sdk/lib/src/atlas/atlas";

export {};

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
}

export interface OrderBy {
  field: string;
  direction: string;
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
