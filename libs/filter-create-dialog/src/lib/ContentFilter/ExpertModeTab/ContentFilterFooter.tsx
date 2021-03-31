import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { LinkWithoutRedirect, PrimaryButton } from '@dg3/components';
import { messages } from '../messages';

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledButton = styled(PrimaryButton)`
  margin-top: ${(props) => props.theme.spacing.normal};
`;

interface Props {
  disabledRoute: boolean;
  expertMode: boolean;
  edit: boolean;
  disabled: boolean;
  handleClick: () => void;
  onTabChange: () => void;
}

export const ContentFilterFooter: React.FC<Props> = (props: Props) => {
  const {
    edit,
    expertMode,
    disabled,
    disabledRoute,
    handleClick,
    onTabChange,
  } = props;

  return (
    <StyledFooter>
      <StyledControls>
        <LinkWithoutRedirect
          disabled={disabledRoute}
          onClick={onTabChange}
          icon={true}
        >
          {expertMode ? (
            <FormattedMessage {...messages.simpleMode} />
          ) : (
            <FormattedMessage {...messages.expertMode} />
          )}
        </LinkWithoutRedirect>
        <StyledButton onClick={handleClick} disabled={disabled}>
          {edit ? (
            <FormattedMessage {...messages.update} />
          ) : (
            <FormattedMessage {...messages.filter} />
          )}
        </StyledButton>
      </StyledControls>
    </StyledFooter>
  );
};
