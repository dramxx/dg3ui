import 'graphiql/graphiql.css';

import { useMutation } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';

import { IMPORT_REPORTS } from '@dg3/graphql';

const StyledHomePage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ReportsImportPage = () => {
  const [importReports] = useMutation(IMPORT_REPORTS, {
    refetchQueries: ['reportsQuery'],
  });

  const reports = [
    {
      name: 'post_test_rep',
      author: 'SYSTEM',
      description: 'test report from post api',
      module: 'READ',
      visibility: ['READ_VIEW', 'READ_USER', 'READ_ADMIN'],
      users: ['SYSTEM'],
      config:
        '{"id":"Readout_post_test","techDescription":"mega test report","title":"Place report 2","keywords":["key","words","for","place","report"],"canvasSettings":{"rows":8,"columns":8},"query":{},"time":{"from":0,"to":0,"timeZone":"UTC"},"version":"1.0.0","widgets":[{"id":"Linechart123","type":"LineChart","query":{},"position":{"x":0,"y":5,"height":4,"width":4},"time":{"from":0,"to":0,"timeZone":"UTC","useDashboardTime":false},"chartProps":{"colors":["#FFD38D","#FFC452","#F49A21","#EA873D","#D9752D","#BF5533","#B1423D","#923545","#79313D"],"title":"Horizontal stacked line chart","legendShow":true,"enableLegendHiding":true,"enableDataSelection":true,"enableDataLabels":true,"enableTooltip":true,"widgetStyle":"stacked","showBorder":true,"enableLineTooltip":true,"enableArea":false,"axisXLabel":"","axisYLabel":"","enableXZoom":true,"layoutDirection":"horizontal"}},{"id":"Pie123","type":"PieChart","query":{},"position":{"x":0,"y":0,"height":4,"width":4},"time":{"from":0,"to":0,"timeZone":"UTC","useDashboardTime":false},"chartProps":{"colors":["#FFD38D","#FFC452","#F49A21","#EA873D","#D9752D","#BF5533","#B1423D","#923545","#79313D"],"title":"Device categories","legendShow":true,"enableLegendHiding":true,"enableDataSelection":true,"enableDataLabels":true,"enableTooltip":true,"widgetStyle":"pie","showBorder":true,"enableRadialLabels":false}},{"id":"Bar123","type":"BarChart","query":{},"position":{"x":5,"y":0,"height":4,"width":4},"time":{"from":0,"to":0,"timeZone":"UTC","useDashboardTime":false},"chartProps":{"colors":["#FFD38D","#FFC452","#F49A21","#EA873D","#D9752D","#BF5533","#B1423D","#923545","#79313D"],"title":"Horizontal stacked Bar chart","legendShow":true,"enableLegendHiding":true,"enableDataSelection":true,"enableDataLabels":true,"enableTooltip":true,"widgetStyle":"stacked","showBorder":true,"axisXLabel":"","axisYLabel":"","enableXZoom":true,"layoutDirection":"horizontal"}}]}',
    },
  ];

  const handleClick = () => {
    const result = importReports({
      variables: {
        reports: reports,
      },
    });
    result.then((res) => console.log(`Import result: ${res.data.importReports}`));
  };

  return (
    <StyledHomePage>
      <div>{JSON.stringify(reports)}</div>
      <button onClick={handleClick}>Send</button>
    </StyledHomePage>
  );
};

export default ReportsImportPage;
