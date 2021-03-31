export type MessageDescriptor = {
  id: string;
  defaultMessage: string;
  description?: string | object;
};

export type Messages = {
  [key: string]: MessageDescriptor;
};

export type Languages<T> = {
  cs: T;
  en: T;
};

export const LanguagesStrings: Languages<string> = {
  cs: 'CS',
  en: 'EN',
};
