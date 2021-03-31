import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { LanguagesStrings } from '@dg3/types';
import { StyledDatetimeInput } from './styles';

export interface InputValidity {
  value: string;
  valid: boolean;
}

interface Props {
  date: string;
  onChange: (data: InputValidity) => void;
  alignText?: string;
}

const localisedValidations = [
  {
    lang: LanguagesStrings.en,
    validationExp:
      '^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/\\d{4} (00|0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[0-5][0-9]):(0[0-9]|[0-5][0-9])$',
  },
];

export default function DatetimeInput({ onChange, date, alignText }: Props) {
  const [isValid, setValidity] = useState(true);
  const { locale } = useIntl();

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO validation based on localisation
    const selectedLanguage = localisedValidations.find((l) => l.lang === locale.toLocaleUpperCase());

    const validationRegExp = selectedLanguage ? selectedLanguage.validationExp : localisedValidations[0].validationExp;

    const expr = new RegExp(validationRegExp);
    const valResult = expr.test(e.target.value);

    setValidity(valResult);
    onChange({ value: e.target.value, valid: valResult });
  };

  return (
    <StyledDatetimeInput isValid={isValid} alignText={alignText}>
      <input
        type="text"
        name="customDateTimeInput"
        value={date}
        onChange={(e) => validateInput(e)}
        onBlur={(e) => validateInput(e)}
      />
    </StyledDatetimeInput>
  );
}
