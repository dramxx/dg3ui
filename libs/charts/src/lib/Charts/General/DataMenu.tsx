import React, { Dispatch } from 'react';
import PieMenu, { Slice } from 'react-pie-menu';
import Tooltip from 'react-tooltip-lite';
import styled from 'styled-components';
import { DotsIcon } from '@dg3/icons';

type Props = {
  dataMenuShow: boolean;
  dataPoint: any; //Todo create type
  radius: number;
  centerRadius: number;
  setDataMenuShow: Dispatch<boolean>;
};

const StyledPieMenu = styled(PieMenu)`
  z-index: 10;
  cursor: pointer;
`;
const StyledLabel = styled.div`
  background-color: ${(props) => props.theme._customTheme.colors.black};
  color: ${(props) => props.theme._customTheme.colors.white};
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  z-index: 10;
  padding: 0.5rem;
`;
// TODO refactor also this component
export const DataMenu = (props: Props) => {
  const { dataPoint } = props;

  const items = [
    {
      action: () => {
        alert(`selected category ${dataPoint.name}`);
        props.setDataMenuShow(false);
      },
      icon: <DotsIcon color={'red'}/>,
      tooltipPosition: 'up',
      label: `select category`,
    },
    {
      action: () => {
        alert(
          `selected data point with id: [ ${dataPoint.name}, ${
            typeof dataPoint.value === 'object'
              ? dataPoint.value[dataPoint.seriesName]
              : dataPoint.value
          } ]`,
        );
        props.setDataMenuShow(false);
      },
      icon: <DotsIcon color={'red'}/>,
      tooltipPosition: 'right',
      label: `select data point`,
    },
    {
      action: () => {
        alert(
          `selected data series with id: ${
            dataPoint.seriesName ? dataPoint.seriesName : dataPoint.name
          }`,
        );
        props.setDataMenuShow(false);
      },
      icon: <DotsIcon color={'red'}/>,
      tooltipPosition: 'left',
      label: `select data series`,
    },
  ];

  return (
    <React.Fragment>
      {props.dataMenuShow && (
        <StyledPieMenu
          className={'pie-menu'}
          radius={`${props.radius}px`}
          centerRadius={`${props.centerRadius}px`}
          centerX={`${dataPoint.event.offsetX}px`}
          centerY={`${dataPoint.event.offsetY}px`}
        >
          {items.map((item, index) => (
            <Slice
              key={index}
              className={'pie-menu-item'}
              onSelect={item.action}
            >
              <Tooltip
                arrow={false}
                content={<StyledLabel>{item.label}</StyledLabel>}
                direction={item.tooltipPosition}
              >
                <div className={'pie-menu-item-icon'}>{item.icon}</div>
              </Tooltip>
            </Slice>
          ))}
        </StyledPieMenu>
      )}
    </React.Fragment>
  );
};

DataMenu.defaultProps = {
  radius: 60,
  centerRadius: 20,
};
