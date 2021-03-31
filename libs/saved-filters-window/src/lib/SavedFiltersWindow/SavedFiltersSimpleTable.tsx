import { useMutation } from '@apollo/client';
import { isEmpty } from 'ramda';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';

import {
  DELETE_SAVED_FILTER,
  SAVED_FILTERS_QUERY,
  contentFilterVar,
  useNotification,
} from '@dg3/graphql';
import { ClearBinIcon } from '@dg3/icons';
import { messages } from './messages';
import { SavedFilterType } from './SavedFiltersWindow';

const StyledSimpleTable = styled.div`
  min-width: 100%;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  line-height: 25px;
  min-width: 100%;
  width: 100%;
  table-layout: fixed;
`;

const StyledFilterName = styled.span`
  font-size: ${(props) => props.theme.fontSize.small};
`;

const StyledRow = styled.tr`
  background-color: ${(props) => props.theme.colors.white};
  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.grey2};
  }
  :first-child > td {
    :first-child {
      border-top-left-radius: ${(props) => props.theme.radius.small};
    }
    :last-child {
      border-top-right-radius: ${(props) => props.theme.radius.small};
    }
  }
  :last-child > * {
    :first-child {
      border-bottom-left-radius: ${(props) => props.theme.radius.small};
    }
    :last-child {
      border-bottom-right-radius: ${(props) => props.theme.radius.small};
    }
  }
  :hover {
    background: ${(props) => props.theme.colors.grey1};
    ${StyledFilterName} {
      font-size: ${(props) => props.theme.fontSize.normal};
    }
  }
`;

const StyledCell = styled.td`
  padding: 0 ${(props) => props.theme.spacing.normal};
  > *:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing.small};
  }
  cursor: pointer;
`;

const StyledMessage = styled.div`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.normal}`};
`;

type Props = {
  filters: Array<SavedFilterType>;
  handleClose: () => void;
};

export const SavedFiltersSimpleTable: React.FC<Props> = (props: Props) => {
  const { filters, handleClose } = props;
  const intl = useIntl();
  const notification = useNotification();

  const [deleteSavedFilter] = useMutation(DELETE_SAVED_FILTER, {
    refetchQueries: [{ query: SAVED_FILTERS_QUERY }],
    onCompleted: () => {
      notification.success(intl.formatMessage(messages.filterDeleted));
    },
    onError: (err) => {
      notification.error(
        intl.formatMessage(messages.errorFilterDeleted),
        err.toString()
      );
    },
  });

  const handleClick = (filter) => {
    contentFilterVar({ chips: filter.contentFilter.chips });
    handleClose();
  };

  const handleDelete = (filter: SavedFilterType, event) => {
    deleteSavedFilter({
      variables: {
        savedFilter: filter,
      },
    });
    handleClose();
    event.stopPropagation();
  };

  return (
    <StyledSimpleTable>
      <StyledTable>
        <tbody>
          {filters.map((filter) => (
            <StyledRow key={filter.name}>
              <StyledCell onClick={() => handleClick(filter)}>
                <ClearBinIcon
                  height={'19px'}
                  width={'19px'}
                  onClick={(e) => handleDelete(filter, e)}
                />
                <StyledFilterName>{filter.name}</StyledFilterName>
              </StyledCell>
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
      {isEmpty(filters) && (
        <StyledMessage>
          <FormattedMessage {...messages.emptySavedFilters} />
        </StyledMessage>
      )}
    </StyledSimpleTable>
  );
};
