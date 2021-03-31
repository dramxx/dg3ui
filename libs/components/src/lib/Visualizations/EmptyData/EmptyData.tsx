import { isNil } from 'ramda';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { messages } from './messages';

interface Props {
  visualizationTitle: React.ReactNode;
}

const StyledEmptyData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.large};
  padding-bottom: 2rem;
`;

export const EmptyData = (props: Props) => {
  return (
    <StyledEmptyData>
      {!isNil(props.visualizationTitle) && (
        <StyledTitle>{props.visualizationTitle}</StyledTitle>
      )}
      <div>
        <FormattedMessage {...messages.noDataFound} />
      </div>
    </StyledEmptyData>
  );
};

EmptyData.defaultProps = {
  visualizationTitle: null,
};
