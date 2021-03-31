import { useReactiveVar } from '@apollo/client';
import { isNil } from 'ramda';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { backdropVar } from '@dg3/graphql';
import { NotificationErrorIcon } from '@dg3/icons';
import { PrimaryButton } from '../Button/PrimaryButton';
import { messages } from './messages';

const StyledErrorMessage = styled.div`
  margin: 0 ${(props) => props.theme.spacing.normal};
  overflow: auto;
  white-space: pre-line;
`;

const StyledErrorNotification = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledDetailsLink = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.link};
  margin-right: ${({ theme }) => theme.spacing.normal};
  :hover {
    text-decoration: underline;
  }
`;

const StyledErrorNotificationDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const StyledDetails = styled.div`
  margin-top: ${({ theme }) => theme.spacing.normal};
  margin-right: ${({ theme }) => theme.spacing.small};
`;

const StyledButtonWrapper = styled.div`
  align-self: flex-end;
`;

type Props = {
  message: string;
  fullError?: string;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = (props: Props) => {
  const { message, fullError, onClose } = props;
  const backdrop = useReactiveVar(backdropVar);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    backdropVar({
      show: true,
      modal: true,
    });
  }, []);

  const handleClose = () => {
    backdropVar({
      show: false,
      modal: false,
    });
    onClose();
  };

  return (
    <div>
      <StyledErrorNotification>
        <StyledIcon onClick={handleClose}>
          <NotificationErrorIcon height={'20px'} width={'20px'} />
        </StyledIcon>
        <StyledErrorMessage>{message}</StyledErrorMessage>
        {!showDetails && (
          <>
            {!isNil(fullError) && (
              <StyledDetailsLink onClick={() => setShowDetails(true)}>
                <FormattedMessage {...messages.details} />
              </StyledDetailsLink>
            )}
            <div>
              <PrimaryButton onClick={handleClose}>{'ok'}</PrimaryButton>
            </div>
          </>
        )}
      </StyledErrorNotification>
      {showDetails && (
        <StyledErrorNotificationDetails>
          <StyledDetails>{fullError}</StyledDetails>
          <StyledButtonWrapper>
            <PrimaryButton onClick={handleClose}>{'ok'}</PrimaryButton>
          </StyledButtonWrapper>
        </StyledErrorNotificationDetails>
      )}
    </div>
  );
};
