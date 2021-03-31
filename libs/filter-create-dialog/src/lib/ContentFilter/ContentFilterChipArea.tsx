import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import styled from 'styled-components';

import { contentFilterVar } from '@dg3/graphql';
import { CoreElementKey, SimpleFilter, SimpleFilterTabProps } from '@dg3/types';
import { EditableContentFilterChip } from './EditableContentFilterChip/EditableContentFilterChip';

const StyledFilterChips = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  margin: 0 ${(props) => props.theme.spacing.small};
  max-width: 20vw;

  /* margin for chips */
  .chip_wrapper {
    margin-right: 3px;
  }
`;

type Props = {
  coreElement: string;
  simpleFilter: React.ComponentType<SimpleFilterTabProps>;
  onSimpleFilterAdd: (
    value: SimpleFilter,
    coreEl: CoreElementKey,
    id?: string
  ) => void;
};

export const ContentFilterChipArea: React.FC<Props> = (props) => {
  const { coreElement, onSimpleFilterAdd, simpleFilter } = props;
  const contentFilter = useReactiveVar(contentFilterVar);

  return (
    <StyledFilterChips onClick={(e) => e.stopPropagation()}>
      {contentFilter.chips
        .filter((item) => item.coreEl === coreElement)
        .map((item) => (
          <EditableContentFilterChip
            key={item.id}
            value={item}
            simpleFilter={simpleFilter}
            onSimpleFilterAdd={onSimpleFilterAdd}
          />
        ))}
    </StyledFilterChips>
  );
};
