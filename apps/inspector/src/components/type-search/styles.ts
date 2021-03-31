import styled from 'styled-components';

export const StyledTypeSearch = styled.div`
  display: flex;
  flex-direction: column;
  height: 97%;
  width: 100%;
  overflow-y: auto;
  padding-top: 1rem;
  padding-right: 1rem;
`;

export const FlexRow = styled.div<{ align?: string; justify?: string }>`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.align || 'flex-start'};
  justify-content: ${(props) => props.justify || 'flex-start'};
`;

export const FlexCol = styled.div<{ align?: string; justify?: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align || 'flex-start'};
  justify-content: ${(props) => props.justify || 'flex-start'};
`;

export const StyledTypeItem = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  .color-dot {
    min-width: 2rem;
    min-height: 2rem;
    border-radius: 50%;
    margin-right: 1rem;
    cursor: pointer;
  }
  .button {
    min-width: 2rem;
    min-height: 2rem;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: lightgrey;
    border-radius: 50%;
    visibility: hidden;
    font-weight: bold;
    &:hover {
      background: grey;
      color: white;
    }
  }
  &:hover {
    background: white;
    .button {
      visibility: visible;
    }
  }
`;

export const StyledTypeItemName = styled.div`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 1rem;
`;

export const StyledInput = styled.input`
  background: white;
  margin-left: 1rem;
  flex-grow: 1;
`;

export const StyledColorPicker = styled.div`
  position: absolute;
  left: 0;
  top: 40px;
  z-index: 1;
`;

export const StyledButton = styled.button`
  cursor: pointer;
  &:hover {
    background: lightgray;
  }
`;

export const TreeSearch = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px grey;
  border-radius: 0.5rem;
  padding: 1rem;
  max-height: 40rem;
  overflow: auto;
  width: 100%;
`;

export const TreeItemRow = styled.div<{ level: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  min-height: 3rem;
  padding-left: ${(props) => `${props.level * 2 + 1}rem`};
  width: 100%;
  &:hover {
    background: whitesmoke;
  }
  span {
    user-select: none;
  }
`;
