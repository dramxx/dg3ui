import { Locale } from 'date-fns';
import { range } from 'ramda';
import { createContext, createElement, useContext, useMemo } from 'react';
import { useIntl } from 'react-intl';

type LocaleTable = Record<string, Locale>;

const DateLocaleContext = createContext<LocaleTable | null>(null);

export const LocaleTableProvider = DateLocaleContext.Provider;

export const useDateLocale = (): Locale => {
  const { locale } = useIntl();
  const localeTable = useContext(DateLocaleContext);
  if (!localeTable) {
    throw new Error(
      'No locale table provided. Probably using outside of LocaleTableProvider.'
    );
  }

  const currentLocale = localeTable[locale];
  if (!currentLocale) {
    throw new Error(
      `No locale for "${locale}". Add it to LocaleTableProvider.`
    );
  }
  return currentLocale;
};

// not using JSX due to utils being used in server
export const withLocaleTable = (localeTable: LocaleTable) => (storyFn) =>
  createElement(LocaleTableProvider, { value: localeTable }, storyFn());

export const useWeekStartsOn = () => {
  const locale = useDateLocale();
  return locale.options.weekStartsOn;
};

export const useDayLabels = (width?: string) => {
  const locale = useDateLocale();
  return useMemo(
    () =>
      range(0, 7).map((day) => locale.localize.day(day, width && { width })),
    [locale, width]
  );
};

export const useMonthLabels = (width?: string) => {
  const locale = useDateLocale();
  return useMemo(
    () =>
      range(0, 12).map((month) =>
        locale.localize.month(month, width && { width })
      ),
    [locale, width]
  );
};
