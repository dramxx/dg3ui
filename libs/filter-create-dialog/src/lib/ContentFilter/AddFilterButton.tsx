import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { messages } from './messages';

const StyledAdd = styled.div`
  min-width: 8rem;
  margin-right: ${(props) => props.theme.spacing.small};
  background: transparent;
  color: ${(props) => props.theme.colors.black};
  font-weight: ${(props) => props.theme.fontWeight.normal};
`;

export const AddFilterButton: React.FC = () => {
  return (
    <StyledAdd>
      <FormattedMessage {...messages.addFilter} />
    </StyledAdd>
  );
};
