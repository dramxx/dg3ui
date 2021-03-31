import cronstrue from 'cronstrue/i18n';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  expression: string;
  weekStartsOnSunday?: boolean;
}

export const LocalizedCronExpression: FC<Props> = (props) => {
  const { expression, weekStartsOnSunday } = props;
  const { locale } = useIntl();
  return (
    <>
      {cronstrue.toString(expression, {
        locale,
        dayOfWeekStartIndexZero: !weekStartsOnSunday,
      })}
    </>
  );
};
