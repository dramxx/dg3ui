import React from 'react';
import styled from 'styled-components';

interface EventsProps {
  count: number;
  radius: string; // circle radius in rems
}

interface Props {
  events: EventsProps;
  color?: string;
}

export const StyledCircle = styled.span<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.events.radius};
  width: ${(props) => props.events.radius};
  border-radius: 50%;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSize.small};
  background-color: ${(props) =>
  props.color ? props.color : props.theme.colors.primary1};
`;

export const Circle: React.FC<Props> = (props: Props) => {
  const { events } = props;

  return (
    <StyledCircle className="circle" {...props}>
      {events.count > 0 && events.count}
    </StyledCircle>
  );
};
