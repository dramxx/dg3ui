import { parseISO } from 'date-fns';
import React, { FC } from 'react';
import { FormattedDate } from 'react-intl';

interface Props {
  isoString: string;
  options?: Intl.DateTimeFormatOptions;
}

export const LocalizedIsoDate: FC<Props> = ({
  isoString,
  options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  },
}) => {
  return <FormattedDate {...options} value={parseISO(isoString)} />;
};
