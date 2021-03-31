import * as React from 'react';
import styled from 'styled-components';

interface Props {
  title: React.ReactNode;
}

const StyledReportTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0 1.5rem;
  font-size: ${(props) => props.theme.fontSize.large};
`;

export const ReportTitle = (props: Props) => {
  return (
    <StyledReportTitle className={'report-title'}>
      {props.title}
    </StyledReportTitle>
  );
};
