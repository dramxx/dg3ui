import { clamp } from 'ramda';
import * as React from 'react';
import { FC, useMemo } from 'react';
import GridLayout from 'react-grid-layout';
import ReactResizeDetector from 'react-resize-detector';
import styled from 'styled-components';

import { withErrorBoundary } from '@dg3/components';
import { ReportConfig, ReportConfigSchema } from '@dg3/schema';
import { VisualizationRender } from './VisualizationRender';

const MARGIN = 18;

const StyledSizer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
`;

const MIN_WIDTH = 1200;
const MAX_WIDTH = 4096;
const MIN_HEIGHT = 680;
const MAX_HEIGHT = 2160;

type Props = {
  config: any;
  id?: string;
};

export const Report: FC<Props> = withErrorBoundary((props: Props) => {
  const validConfig: ReportConfig = ReportConfigSchema.check(props.config);
  const { widgets, canvasSettings } = validConfig;
  const {
    minWidth = MIN_WIDTH,
    maxWidth = MAX_WIDTH,
    minHeight = MIN_HEIGHT,
    maxHeight = MAX_HEIGHT,
  } = canvasSettings;

  const layout = useMemo(
    () =>
      widgets.map((widget) => ({
        i: widget.id,
        x: widget.position.x,
        y: widget.position.y,
        w: widget.position.width,
        h: widget.position.height,

        static: true, // lock widget positions
      })),
    [widgets]
  );

  return (
    <StyledSizer>
      <ReactResizeDetector handleWidth={true} handleHeight={true}>
        {({ width = 0, height = 0 }) => {
          const finalHeight = clamp(minHeight, maxHeight, height);
          const finalWidth = clamp(minWidth, maxWidth, width);

          const rowHeight =
            (finalHeight - MARGIN) / canvasSettings.rows - MARGIN;
          return (
            <GridLayout
              layout={layout}
              margin={[MARGIN, MARGIN]}
              maxRows={canvasSettings.rows}
              cols={canvasSettings.columns}
              rowHeight={rowHeight}
              width={finalWidth}
            >
              {widgets.map((visualization) => (
                <div key={visualization.id}>
                  <VisualizationRender config={visualization} />
                </div>
              ))}
            </GridLayout>
          );
        }}
      </ReactResizeDetector>
    </StyledSizer>
  );
});
