import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import {
  DialogButtons,
  Dropdown,
  DropdownMenuItem,
  SimpleChip,
} from '@dg3/components';
import { FilterChip } from '@dg3/types';
import { messages } from './messages';

const StyledTaskDialogContent = styled.div`
  width: 300px;
  padding: ${(props) => props.theme.spacing.normal};
`;

const StyledChipArea = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 200px;
  overflow: auto;
  border: 1px solid ${(props) => props.theme.colors.grey2};
  border-radius: ${(props) => props.theme.radius.small};
  background-color: ${(props) => props.theme.colors.grey1};
  padding: ${(props) => props.theme.spacing.small};

  .simpleChip {
    margin-right: ${(props) => props.theme.spacing.small};
    margin-bottom: ${(props) => props.theme.spacing.small};
  }
`;

const StyledTitle = styled.div`
  padding-bottom: ${(props) => props.theme.spacing.small};
`;

const StyledSectionTitle = styled.div``;

const StyledSection = styled.div`
  padding-bottom: ${(props) => props.theme.spacing.normal};
`;

interface Props {
  filter: Array<FilterChip>;
  templates: Array<DropdownMenuItem>;
  onTaskRun: (filter: Array<FilterChip>, templateId: string) => void;
  onClose: () => void;
}

export const AdhocTaskDialogContent: React.FC<Props> = (props) => {
  const { onClose, onTaskRun, templates } = props;
  const [template, setTemplate] = useState(templates[0]);
  const [filter, setFilter] = useState(props.filter);

  const handleChipDelete = (event: React.MouseEvent, id: string) => {
    setFilter(filter.filter((chip) => chip.id !== id));
  };

  const handleTaskRun = () => {
    onTaskRun(filter, template.id);
  };

  return (
    <StyledTaskDialogContent>
      <StyledTitle>
        <FormattedMessage {...messages.oneTimeTaskRun} />
      </StyledTitle>
      <StyledSection>
        <Dropdown
          width={'100%'}
          items={templates}
          label={template.label}
          onValueChange={(id) =>
            setTemplate(templates.find((template) => template.id === id))
          }
        />
      </StyledSection>
      <StyledSection>
        <StyledSectionTitle>
          <FormattedMessage {...messages.usedFilters} />
        </StyledSectionTitle>
        <StyledChipArea>
          {filter.map((value) => (
            <SimpleChip
              id={value.id}
              key={value.id}
              label={value.label}
              onDelete={handleChipDelete}
            />
          ))}
        </StyledChipArea>
      </StyledSection>
      <DialogButtons
        onClose={onClose}
        onConfirm={handleTaskRun}
        confirmLabel={<FormattedMessage {...messages.runAdhocTask} />}
        isConfirmEnabled={true}
      />
    </StyledTaskDialogContent>
  );
};
