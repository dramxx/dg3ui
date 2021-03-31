import styled from 'styled-components';

export const StyledFilter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const StyledDatePicker = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  margin-right: 2rem;
  width: 300px;
`;

export const StyledDateLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: pointer;
  user-select: none;
  &:hover {
    font-weight: bold;
  }
`;

export const StyledPickerWrapper = styled.div`
  z-index: 1;
`;
