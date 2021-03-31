import React from 'react';
import styled from 'styled-components';
import createEngine, {
  NodeModel,
  DiagramModel,
  DefaultNodeModel,
  DefaultLinkModel,
  LinkModel,
} from '@projectstorm/react-diagrams/';
import { DagreWidget } from './DagreWidget';

export type EdgeCounts = {
  in: number;
  out: number;
};

export type Node = {
  id: string;
  name: string;
  color?: string;
  dgType: string;
  edgeCounts?: EdgeCounts;
  attributes?: Object[];
};

export type Edge = {
  id: string;
  source: string;
  target: string;
  color?: string;
  dgType: string;
  attributes?: Object[];
};

type GraphData = {
  nodes: Node[];
  edges: Edge[];
};

// TODO add props types
interface PropsType {
  data: GraphData;
  height: number;
  width: number;
}

const StyledCanvasWrapper = styled.div`
  height: 100%;
  background-color: rgb(60, 60, 60) !important;
  display: flex;
  flex-direction: column;

  > * {
    height: 100%;
    min-height: 100%;
    width: 100%;
  }
`;

const StyledGraphWrapper = styled.div<{ width: number; height: number }>`
  .canvasWidget {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: rgb(60, 60, 60);
  }
`;

function createNode(node: Node): any {
  switch (node.dgType) {
    case 'place':
      return new DefaultNodeModel({
        ...node,
        color: 'rgb(66, 165, 245)',
      });
    case 'device':
      return new DefaultNodeModel({
        ...node,
        color: 'rgb(102, 187, 106)',
      });
    default:
      return new DefaultNodeModel({
        ...node,
        color: 'rgb(0,192,255)',
      });
  }
}

function findNodeModel(id: string, nodes: NodeModel[]) {
  return nodes.find((node) => {
    return node.getOptions()['id'] === id;
  });
}

function getEdgeParams(link: LinkModel): Edge {
  const options = link.getOptions();
  const source = link
    .getSourcePort()
    .getParent()
    .getID();

  const target = link
    .getTargetPort()
    .getParent()
    .getID();

  return {
    id: options['extId'],
    source,
    target,
    dgType: options['dgType'],
  };
}

function getNodesParams(node: NodeModel): Node {
  const options = node.getOptions();

  return {
    id: options['extId'],
    name: options['name'],
    dgType: options['dgType'],
    attributes: options['attributes'],
  };
}

function connectNodes(data: GraphData, model: DiagramModel) {
  data.edges.map((edge) => {
    const nodeFrom = findNodeModel(edge.source, model.getNodes());
    const nodeTo = findNodeModel(edge.target, model.getNodes());

    if (nodeFrom && nodeTo) {
      const link = new DefaultLinkModel({
        extId: edge.id,
        dgType: edge.dgType,
        attributes: edge.attributes,
      });

      edge.id = link.getID();

      link.setSourcePort(nodeFrom.getPorts().Out);
      link.setTargetPort(nodeTo.getPorts().In);
      link.addLabel(edge.dgType);

      link.registerListener({
        selectionChanged: (event) => {
          if (event && event.entity && event.entity.isSelected()) {
            const edgeId = event.entity.getID();
            const edge = data.edges.find((edge) => edge.id === edgeId);
          }
        },
      });

      // @ts-ignore
      model.addLink(link);
    }
  });
}

export const Graph = (props: PropsType) => {
  const { data, width, height } = props;

  // setup the diagram engine
  const engine = createEngine();

  // setup the diagram model
  const model = new DiagramModel();

  data.nodes.forEach((node, index) => {
    const newNode = createNode(node);
    const randomPosition = Math.floor(Math.random() * 50);
    newNode.setPosition(index * randomPosition, index * 10);

    newNode.addInPort('In');
    newNode.addOutPort('Out');

    model.addNode(newNode);
  });

  connectNodes(data, model);

  model.setZoomLevel(30);
  engine.setModel(model);

  const addNewNode = (dgType: string) => {
    const random = Math.random()
      .toString()
      .split('.')[1];

    const placeholderNode = {
      id: `newNode_${random}`,
      name: 'newNode',
      dgType: dgType,
      attributes: [
        {
          id: random,
          name: 'newNode',
        },
      ],
    };

    // todo randomize position
    const newNode = createNode(placeholderNode);
    newNode.addInPort('In');
    newNode.addOutPort('Out');

    model.addNode(newNode);
    engine.repaintCanvas();
  };

  return (
    <StyledGraphWrapper width={width} height={height}>
      <StyledCanvasWrapper>
        <DagreWidget engine={engine} model={model} onNodeCreate={addNewNode} />
      </StyledCanvasWrapper>
    </StyledGraphWrapper>
  );
};
