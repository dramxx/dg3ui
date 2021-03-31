import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { PrimaryButton } from '../Button/PrimaryButton';
import { SecondaryButton } from '../Button/SecondaryButton';
import { messages } from './messages';

const StyledButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-left: ${(props) => props.theme.spacing.small};
`;

const StyledSecondaryButton = styled(SecondaryButton)`
  margin-left: ${(props) => props.theme.spacing.small};
`;

type Props = {
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel: React.ReactNode;
  isConfirmEnabled: boolean;
};

export const DialogButtons: React.FC<Props> = (props: Props) => {
  const { onClose, onConfirm, confirmLabel, isConfirmEnabled } = props;

  return (
    <StyledButtons>
      <StyledSecondaryButton onClick={onClose}>
        <FormattedMessage {...messages.cancel} />
      </StyledSecondaryButton>
      <StyledPrimaryButton onClick={onConfirm} disabled={!isConfirmEnabled}>
        {confirmLabel}
      </StyledPrimaryButton>
    </StyledButtons>
  );
};
