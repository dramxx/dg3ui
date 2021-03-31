import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { ELASTIC_PAGINATION_ITEM_LIMIT } from '../../constants';
import { messages } from './messages';

const StyledItemsCount = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  margin-right: ${(props) => props.theme.spacing.normal};
  color: ${(props) => props.theme.colors.grey4};
  overflow: hidden;
`;

interface Props {
  totalCount: number;
  selectedCount: number;
}

export const ItemsCount: React.FC<Props> = (props: Props) => {
  const { totalCount, selectedCount } = props;

  return (
    <StyledItemsCount>
      {selectedCount > 0 && <div>{`${selectedCount} / `}</div>}
      <FormattedMessage
        values={{ count: totalCount, maxCount: ELASTIC_PAGINATION_ITEM_LIMIT }}
        {...(totalCount > ELASTIC_PAGINATION_ITEM_LIMIT
          ? messages.itemsOverflow
          : messages.items)}
      />
    </StyledItemsCount>
  );
};
