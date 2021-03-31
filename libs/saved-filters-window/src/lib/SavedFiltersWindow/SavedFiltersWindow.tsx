import { useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Popover } from '@dg3/components';
import { backdropVar, savedFiltersVar } from '@dg3/graphql';
import { FilterIcon } from '@dg3/icons';
import { SavedFiltersSimpleTable } from './SavedFiltersSimpleTable';

const StyledSavedFiltersWindowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSavedFiltersWindow = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  max-height: calc(92vh - ${(props) => props.theme.sizes.topBarHeight});
  overflow: auto;
`;

export type SavedFilterType = {
  name: string;
  author: string;
  contentFilter: object;
};

type Props = {
  savedFilterList: Array<SavedFilterType>;
};

export const SavedFiltersWindow: React.FC<Props> = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const backdrop = useReactiveVar(backdropVar);

  const savedFilterList =
    useReactiveVar(savedFiltersVar) ?? props.savedFilterList;

  const handleToggle = () => {
    setShow(!show);
    backdropVar({ ...backdrop, show: !show });
  };

  const handleClose = () => {
    setShow(false);
    backdropVar({ ...backdrop, show: false });
  };

  return (
    <StyledSavedFiltersWindowWrapper>
      <Popover
        show={show}
        onToggle={handleToggle}
        parent={<FilterIcon width={'24px'} height={'24px'} active={show} />}
        placement={'bottom-end'}
      >
        <StyledSavedFiltersWindow className={'savedFiltersWindow'}>
          <SavedFiltersSimpleTable
            filters={savedFilterList}
            handleClose={handleClose}
          />
        </StyledSavedFiltersWindow>
      </Popover>
    </StyledSavedFiltersWindowWrapper>
  );
};
