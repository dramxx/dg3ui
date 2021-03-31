import styled from 'styled-components';

export const StyledRelationsTab = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const StyledGraph = styled.div`
  border: solid 1px grey;
  border-radius: 4px;
  flex-basis: 0;
  flex-grow: 1;
`;

export const StyledTable = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  overflow: auto;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;

export const StyledRadioButton = styled.label`
  margin-right: 10px;
  input {
    margin-right: 3px;
  }
`;
