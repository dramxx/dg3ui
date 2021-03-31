import React from 'react';

import {
  DiagramModel,
  DiagramEngine,
  DagreEngine,
} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { GraphToolbar } from './GraphToolbar';

export class DagreWidget extends React.Component<
  {
    model: DiagramModel;
    engine: DiagramEngine;
    onNodeCreate: (dgType: string) => void;
  },
  any
> {
  engine: DagreEngine;

  constructor(props) {
    super(props);
    this.engine = new DagreEngine({
      graph: {
        rankdir: 'LR',
        ranker: 'longest-path', // longest-path , network-simplex, tight-tree
        marginx: 50,
        marginy: 50,
      },
      includeLinks: true,
    });
  }

  autoDistribute = () => {
    // @ts-ignore
    this.engine.redistribute(this.props.model);
    this.props.engine.repaintCanvas();
  };

  // componentDidMount(): void {
  //   setTimeout(() => {
  //     this.autoDistribute();
  //   }, 200);
  // }

  widget = (
    // @ts-ignore
    <CanvasWidget className={'canvasWidget'} engine={this.props.engine} />
  );

  render() {
    return (
      <React.Fragment>
        <GraphToolbar
          model={this.props.model}
          engine={this.props.engine}
          onAutoDistribute={this.autoDistribute}
          onNodeCreate={this.props.onNodeCreate}
        />
        {this.widget}
      </React.Fragment>
    );
  }
}
