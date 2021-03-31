import { isNil } from 'ramda';
import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { AutocompleteTextInput, SimpleChip, TextInput } from '@dg3/components';
import { SimpleFilterValue } from '@dg3/types';

const StyledValueArea = styled.div<{ autocomplete: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: ${(props) => props.theme.spacing.small} 0;
`;

const StyledChipArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow: scroll;

  .simpleChip {
    margin-right: ${(props) => props.theme.spacing.small};
    margin-bottom: ${(props) => props.theme.spacing.small};
  }
`;

interface Props {
  values: Array<SimpleFilterValue>;
  onValuesChange: (values: Array<SimpleFilterValue>) => void;
  autocomplete: boolean;
  hintsList: Array<SimpleFilterValue>;
}

export const ValueInputArea: React.FC<Props> = (props: Props) => {
  const { values, onValuesChange, hintsList, autocomplete } = props;
  const [value, setValue] = useState<string>('');

  const handleSubmit = (value: string) => {
    const separator = /,|;|\r?\n/;
    const newValues = value.split(separator);

    const update = newValues.filter(
      (item) =>
        /\S/.test(item) && !values.some((element) => element.name === item)
    );

    const formattedUpdate = update.map((newValue) => {
      const formattedItem = { id: newValue, name: newValue, intId: '' };
      if (autocomplete) {
        const hint = hintsList.find((el) => el.name === newValue);
        return isNil(hint) ? formattedItem : hint;
      }
      return formattedItem;
    });

    onValuesChange([...values, ...formattedUpdate]);
    setValue('');
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleChipDelete = (e: React.MouseEvent, id: string) => {
    onValuesChange(values.filter((item) => item.id !== id));
  };

  return (
    <StyledValueArea autocomplete={autocomplete}>
      <StyledChipArea>
        {values.map((value) => (
          <SimpleChip
            id={value.id}
            key={value.id}
            label={value.name}
            onDelete={handleChipDelete}
          />
        ))}
      </StyledChipArea>
      {autocomplete && !isNil(hintsList) ? (
        <AutocompleteTextInput
          value={value}
          onValueChange={handleValueChange}
          onSubmit={handleSubmit}
          hints={hintsList.map((item) => item.name)}
        />
      ) : (
        <TextInput
          multiline={true}
          value={value}
          onValueChange={handleValueChange}
          onSubmit={handleSubmit}
        />
      )}
    </StyledValueArea>
  );
};
