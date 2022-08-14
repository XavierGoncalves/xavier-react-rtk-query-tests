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
