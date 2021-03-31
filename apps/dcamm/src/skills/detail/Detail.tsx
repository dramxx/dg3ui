import React from 'react';

import { DetailContent } from '@dg3/detail';
import { DetailProvider } from '@dg3/types';
import { DEVICE_DETAIL } from '../DEVI/detail/DeviceDetail';
import { EVEN_DIO_DETAIL } from '../EVEN/detail/EvenDioDetail';
import { SWITCHING_PLAN_DETAIL } from '../LOAD/detail/SwitchingPlanDetail';
import { MEAS_DIO_DETAIL } from '../MEAS/detail/MeasDioDetail';
import { PLACE_DETAIL } from '../PLAC/detail/PlaceDetail';
import { DIO_DETAIL } from './DioDetail/DioDetail';
import { TASK_EXECUTION_DETAIL } from './TaskExecution/TaskExecutionDetail';
import { TASK_EXECUTION_NODE_DETAIL } from './TaskExecutionNode/TaskExecutionNodeDetail';

export const Detail: DetailProvider = (props) => {
  const { elementId, typeName, overviewModule } = props;

  switch (typeName) {
    case 'device':
      return <DetailContent elementId={elementId} config={DEVICE_DETAIL} />;
    case 'place':
      return <DetailContent elementId={elementId} config={PLACE_DETAIL} />;
    case 'switching_plan':
      return (
        <DetailContent elementId={elementId} config={SWITCHING_PLAN_DETAIL} />
      );
    case 'TaskExecution':
      return (
        <DetailContent elementId={elementId} config={TASK_EXECUTION_DETAIL} />
      );
    case 'TaskExecutionNode':
      return (
        <DetailContent
          elementId={elementId}
          config={TASK_EXECUTION_NODE_DETAIL}
        />
      );
    case 'Dio': {
      switch (overviewModule) {
        case 'EVEN':
          return (
            <DetailContent elementId={elementId} config={EVEN_DIO_DETAIL} />
          );
        case 'MEAS':
          return (
            <DetailContent elementId={elementId} config={MEAS_DIO_DETAIL} />
          );
        default:
          return <DetailContent elementId={elementId} config={DIO_DETAIL} />;
      }
    }
    default:
      return null;
  }
};
