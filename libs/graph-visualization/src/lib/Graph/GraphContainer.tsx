import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import jp from 'jsonpath';
import { clone } from 'ramda';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ErrorLabel } from '@dg3/components';
import {
  GET_NODES,
  contentFilterVar,
  getCoreElContentFilterByKey,
} from '@dg3/graphql';
import { Edge, EdgeCounts, Graph, Node } from './Graph';

type DgNodeType = 'place' | 'device';

const StyledGraphContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledLoading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const countEdges = (edgePlace, edgeDevice): EdgeCounts => {
  let inEdges = 0;
  let outEdges = 0;

  edgePlace &&
    edgePlace.forEach((edge) => {
      edge.dir === 'OUT' ? outEdges++ : inEdges++;
    });

  edgeDevice &&
    edgeDevice.forEach((edge) => {
      edge.dir === 'OUT' ? outEdges++ : inEdges++;
    });

  return {
    in: inEdges,
    out: outEdges,
  };
};

const parseNodes = (dgType: DgNodeType, dataObject): Array<Node> => {
  return dataObject.map((obj) => {
    const edgesCounts: EdgeCounts = countEdges(obj.edgePlace, obj.edgeDevice);

    return {
      id: obj.intId,
      attributes: [
        obj.intId && { intId: obj.intId },
        obj.kind && { kind: obj.kind.id },
        ...obj.attrs.map((attr) => {
          return {
            [attr.did.id]: attr.value,
          };
        }),
        { inEdges: edgesCounts.in },
        { outEdges: edgesCounts.out },
      ],
      name: obj.id ? `${obj.id.did.id}_${obj.id.value}` : obj.intId,
      dgType: dgType,
    };
  });
};

const parseNodeEdges = (node, jpdef: string) => {
  const edges = jp.query(node, jpdef);

  return edges.map((edge) => {
    return {
      id: `${node.intId}_${edge.intId}`,
      dir: edge.dir,
      source: node.intId,
      target: edge.edgeEndPoint.intId,
      dgType: edge.type,
    };
  });
};

const parseEdges = (nodes): Array<Edge> => {
  let edges = [];

  // edgePlace
  nodes.forEach((node) => {
    const nodeEdges = parseNodeEdges(node, '$.edgePlace[*]');
    nodeEdges.forEach((edge) => {
      if (edge.dir === 'OUT') {
        edges.push(edge);
      }
    });
  });

  // edgeDevice
  nodes.forEach((node) => {
    const nodeEdges = parseNodeEdges(node, '$.edgeDevice[*]');
    nodeEdges.forEach((edge) => {
      if (edge.dir === 'OUT') {
        edges.push(edge);
      }
    });
  });

  return edges;
};

export const GraphContainer = (props) => {
  const graphRef = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth - 220);
    setHeight(window.innerHeight - 240);
  }, []);

  const filter = useReactiveVar(contentFilterVar);

  const { loading, error, data } = useQuery(gql(GET_NODES), {
    variables: {
      deviceFilter: getCoreElContentFilterByKey(
        filter.chips.filter((item) => item.coreEl === 'DEVICE')
      ),
      placeFilter: getCoreElContentFilterByKey(
        filter.chips.filter((item) => item.coreEl === 'PLACE')
      ),
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <StyledLoading>Loading...</StyledLoading>;
  if (error) return <ErrorLabel>{error.message}</ErrorLabel>;

  const placeNodes = parseNodes('place', data.places);
  const deviceNodes = parseNodes('device', data.devices);

  const edges = [...parseEdges(data.places), ...parseEdges(data.devices)];
  const nodes = clone([...placeNodes, ...deviceNodes]);

  return (
    <StyledGraphContainer ref={graphRef}>
      <Graph
        data={{
          nodes: nodes,
          edges: edges,
        }}
        height={height}
        width={width}
      />
    </StyledGraphContainer>
  );
};
