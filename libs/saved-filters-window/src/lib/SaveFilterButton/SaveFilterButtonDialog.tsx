import { useMutation, useReactiveVar } from '@apollo/client';
import { isEmpty } from 'ramda';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';

import { PrimaryButton } from '@dg3/components';
import {
  CREATE_SAVED_FILTER,
  savedFiltersVar,
  useNotification,
  userVar,
} from '@dg3/graphql';
import { messages } from './messages';

const FORM_WIDTH = '240px';

const StyledSaveFilterButtonDialog = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: ${FORM_WIDTH};
`;

const StyledInputName = styled.span`
  margin-left: auto;
`;

const StyledInput = styled.input`
  margin-left: ${(props) => props.theme.spacing.small};
  border-radius: ${(props) => props.theme.radius.small};
  line-height: ${(props) => props.theme.fontSize.normal};
  min-width: calc(${FORM_WIDTH} - 60px);
  :focus,
  :hover {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.primary2};
  }
`;

const StyledButton = styled(PrimaryButton)`
  margin-top: 10px;
`;

const StyledError = styled.div`
  color: ${(props) => props.theme.colors.red};
  font-size: ${(props) => props.theme.fontSize.small};
  max-width: ${FORM_WIDTH};
`;

type Props = {
  handleClose: () => void;
  contentFilter: object;
};

export const SaveFilterButtonDialog: React.FC<Props> = (props) => {
  const { handleClose, contentFilter } = props;

  const intl = useIntl();
  const notification = useNotification();

  const [createSavedFilter] = useMutation(CREATE_SAVED_FILTER, {
    refetchQueries: ['savedFiltersQuery'],
    onCompleted: () => {
      notification.success(intl.formatMessage(messages.filterSaved));
    },
    onError: (err) => {
      notification.error(
        intl.formatMessage(messages.errorFilterSave),
        err.toString()
      );
    },
  });

  const [filterName, setFilterName] = useState<string>('');
  const [nameExists, setNameExists] = useState<boolean>(false);
  const isDisabled = isEmpty(filterName) || nameExists;
  const savedFilters = useReactiveVar(savedFiltersVar);
  const user = useReactiveVar(userVar);

  const handleValueChange = (e) => {
    setFilterName(e.target.value);
    setNameExists(!!savedFilters.find((item) => item.name === e.target.value));
  };

  const handleSubmit = () => {
    const newSavedFilter = {
      name: filterName,
      contentFilter: JSON.stringify(contentFilter),
      author: user?.name,
      description: '',
      visibility: ['SYSTEM'],
    };
    createSavedFilter({
      variables: {
        savedFilter: newSavedFilter,
      },
    });
    handleClose();
    setFilterName('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Escape
    if (event.keyCode === 27) {
      handleClose();
    }
    // Enter
    if (event.keyCode === 13 && !isDisabled) {
      handleSubmit();
    }
  };

  return (
    <StyledSaveFilterButtonDialog>
      <StyledForm>
        <StyledInputName>
          <FormattedMessage {...messages.name} />
        </StyledInputName>
        <StyledInput
          type={'text'}
          value={filterName}
          autoFocus
          onChange={handleValueChange}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        />
      </StyledForm>
      <StyledButton onClick={handleSubmit} disabled={isDisabled}>
        <FormattedMessage {...messages.save} />
      </StyledButton>
      {nameExists && (
        <StyledError>
          <FormattedMessage {...messages.saveError} />
        </StyledError>
      )}
    </StyledSaveFilterButtonDialog>
  );
};
