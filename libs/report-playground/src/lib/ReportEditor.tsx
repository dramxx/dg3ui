import { TextareaAutosize } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { PrimaryButton } from '@dg3/components';
import { ReportConfig } from '@dg3/schema';

const StyledEditor = styled.div`
  display: block;
  overflow: scroll;
  height: 90%;
  min-height: 90%;
  max-height: 90%;
  min-width: 500px;
  width: 40vw;
  background-color: ${(props) => props.theme.colors.white};
`;

const StyledButton = styled(PrimaryButton)`
  margin-top: 1rem;
`;

interface Props {
  report: ReportConfig;
  onChange: (report: ReportConfig) => void;
}

export const ReportEditor: React.FC<Props> = (props: Props) => {
  const { onChange } = props;

  const [report, setReport] = useState(JSON.stringify(props.report, null, 4));

  useEffect(() => {
    setReport(JSON.stringify(props.report, null, 4));
  }, [props.report]);

  const handleReportChange = (event) => {
    setReport(event.target.value);
  };

  const onReportLoad = () => {
    const rep = JSON.parse(report);
    onChange(rep);
  };

  return (
    <React.Fragment>
      <StyledEditor>
        <TextareaAutosize
          style={{
            width: '50vw',
          }}
          value={report}
          onChange={handleReportChange}
        />
      </StyledEditor>
      <StyledButton onClick={onReportLoad}>Load updated JSON</StyledButton>
    </React.Fragment>
  );
};
