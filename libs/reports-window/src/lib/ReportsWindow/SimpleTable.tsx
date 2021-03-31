import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ReportMetaInfo } from '@dg3/reports-window';
import { DcammMenuMessages as messages } from '@dg3/types';

const StyledTable = styled.table`
  border-collapse: collapse;
  line-height: 25px;
  min-width: 100%;
  width: 100%;
  table-layout: fixed;
`;

const StyledHeaderRow = styled.tr`
  font-size: ${(props) => props.theme.fontSize.normal};
  background: ${(props) => props.theme.colors.grey3} no-repeat padding-box;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey2};
`;

const StyledHeaderColumn = styled.td`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.small};
  padding: 0 ${(props) => props.theme.spacing.normal};
  color: ${(props) => props.theme.colors.black};
  opacity: 1;
`;

const StyledColumn = styled.td`
  font-size: ${(props) => props.theme.fontSize.small};
  padding: 0 ${(props) => props.theme.spacing.normal};
`;

const StyledRow = styled.tr`
  background: ${(props) => props.theme.colors.white};
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey2};

  :hover {
    background: ${(props) => props.theme.colors.grey1};
    ${StyledColumn} {
      font-size: ${(props) => props.theme.fontSize.normal};
    }
  }
`;

const StyledSimpleTab = styled.div`
  min-width: 100%;
  :first-child {
    // first table
    ${StyledHeaderColumn} {
      :first-child {
        border-top-left-radius: ${(props) => props.theme.radius.small};
      }
      :last-child {
        border-top-right-radius: ${(props) => props.theme.radius.small};
      }
    }
  }
  :last-child {
    // last table
    ${StyledRow}:last-child {
      // last row
      border-bottom: none;
      ${StyledColumn} {
        :first-child {
          border-bottom-left-radius: ${(props) => props.theme.radius.small};
        }
        :last-child {
          border-bottom-right-radius: ${(props) => props.theme.radius.small};
        }
      }
    }
  }
`;

interface Props {
  category: string;
  reports: ReportMetaInfo[];
  onRedirect: () => void;
}

export const SimpleTable: React.FC<Props> = (props: Props) => {
  const { category, reports, onRedirect } = props;
  const history = useHistory();

  const handleClick = (report: ReportMetaInfo) => {
    history.push(`/${report.module}/report/${report.id}`);
    onRedirect();
  };

  return (
    <StyledSimpleTab>
      <StyledTable>
        <thead>
          <StyledHeaderRow>
            <StyledHeaderColumn>
              <FormattedMessage {...messages[category]} />
            </StyledHeaderColumn>
          </StyledHeaderRow>
        </thead>
        <tbody>
          {reports.map((report) => (
            <StyledRow key={report.id}>
              <StyledColumn onClick={() => handleClick(report)}>
                {report.name}
              </StyledColumn>
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
    </StyledSimpleTab>
  );
};
