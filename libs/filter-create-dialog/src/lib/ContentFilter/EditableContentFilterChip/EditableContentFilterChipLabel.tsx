import * as React from 'react';
import styled from 'styled-components';

const StyledChipLabel = styled.div<{ active: boolean; ref: any }>`
  font-size: ${(props) => props.theme.fontSize.normal};
  color: ${(props) => props.theme.colors.black};
  display: ${(props) => (props.active ? 'none' : 'block')};
  min-width: 74px;
  max-width: 120px;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 100%;
  overflow: hidden;
  vertical-align: middle;
  text-align: center;
`;

interface Props {
  label: React.ReactNode;
  active: boolean;
}

const blockClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  // block clicks outside of buttons
  e.stopPropagation();
};

export const EditableContentFilterChipLabel = React.forwardRef(
  (props: Props, ref) => {
    const { active, label } = props;

    return (
      <StyledChipLabel ref={ref} active={active} onClick={blockClick}>
        {label}
      </StyledChipLabel>
    );
  }
);
