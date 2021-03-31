import { EdgeInstance, INSTANCE_RELATIONS_TAB, IdVar, InstanceRelationsQueryResponse } from '@api';
import { useQuery } from '@apollo/client';
import ReactEcharts from 'echarts-for-react';
import React from 'react';

import { TabProps } from '../../model';
import { StyledGraph, StyledRelationsTab, StyledTable } from './styles';

export default function RelationsTab(props: TabProps) {
  const { instanceId } = props;

  const { data, loading, error } = useQuery<InstanceRelationsQueryResponse, IdVar>(INSTANCE_RELATIONS_TAB, {
    variables: { id: instanceId },
  });

  if (loading) return <div>{'Loading...'}</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  const edgeInstance: EdgeInstance[] = data.instances[0].edgeInstance;
  const targets = [...new Set(edgeInstance.map((x) => x.edgeEndPoint.id.value))];

  const nodes = [
    { id: instanceId, name: instanceId, category: 'source' },
    ...targets.map((x) => ({ id: x, name: x, category: 'target' })),
  ];

  const links = targets.map((target) => ({ source: instanceId, target }));

  return (
    <StyledRelationsTab>
      <StyledGraph>
        <ReactEcharts
          style={{ width: '100%', height: '100%' }}
          option={{
            series: [
              {
                name: 'Relations',
                type: 'graph',
                layout: 'force',
                data: nodes,
                links: links,
                roam: true,
                label: { position: 'right' },
                force: { repulsion: 500, edgeLength: 200 },
                categories: [
                  { name: 'source', symbolSize: 50 },
                  { name: 'target', symbolSize: 20 },
                ],
              },
            ],
          }}
        />
      </StyledGraph>
      <StyledTable>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Direction</th>
              <th>Type</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>
            {edgeInstance.map((x, index) => (
              <tr key={index}>
                <td>{x.existsFrom}</td>
                <td>{x.existsTo}</td>
                <td>{x.direction}</td>
                <td>{x.type}</td>
                <td>{x.edgeEndPoint.id.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTable>
    </StyledRelationsTab>
  );
}
