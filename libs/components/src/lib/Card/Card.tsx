import React from 'react';
import styled from 'styled-components';

import { renderValueByType } from '../ValueRender/renderValueByType';

const StyledCard = styled.div<{ height: string; width: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  padding: ${(props) => props.theme.spacing.small}
    ${(props) => props.theme.spacing.large};
  margin: ${(props) => props.theme.spacing.small};
  border: 1px solid ${(props) => props.theme.colors.grey2};
  border-radius: ${(props) => props.theme.radius.small};
  box-shadow: ${(props) => props.theme.shadows.shadow3};
`;

const StyledLabel = styled.div`
  opacity: 0.9;
  font-weight: bold;
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

const StyledValue = styled.div`
  font-weight: bold;
  font-size: 26px;
`;

interface Props {
  label: React.ReactNode;
  value: string | boolean | number;
  height?: string;
  width?: string;
}

export const Card: React.FC<Props> = (props: Props) => {
  const { height, width, label, value } = props;

  return (
    <StyledCard height={height} width={width}>
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>{renderValueByType(value)}</StyledValue>
    </StyledCard>
  );
};
