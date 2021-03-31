import * as React from 'react';
import styled, { ThemeContext } from 'styled-components';
import { RightArrowIcon } from '@dg3/icons';
import { useContext } from 'react';

interface Props {
  icon: boolean;
  disabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const StyledSpan = styled.div<{ disabled: boolean }>`
  color: ${(props) =>
    props.disabled ? props.theme.colors.grey3 : props.theme.colors.link};
  font-size: ${(props) => props.theme.fontSize.small};
  text-decoration: underline;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export const LinkWithoutRedirect: React.FC<Props> = (props: Props) => {
  const { icon, disabled, children, onClick } = props;
  const themeContext = useContext(ThemeContext);

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <StyledSpan disabled={disabled} onClick={handleClick}>
      {children}
      {icon && (
        <RightArrowIcon
          color={
            disabled ? themeContext.colors.grey3 : themeContext.colors.link
          }
          height={'14px'}
          width={'16px'}
        />
      )}
    </StyledSpan>
  );
};
