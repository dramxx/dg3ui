import React from 'react';

import Loader from './Loader';
import {
  StyledDetail,
  StyledFilter,
  StyledInjectedFilter,
  StyledLayout,
  StyledLeftPanel,
  StyledOverview,
  StyledRightPanel,
  StyledTypeSearch,
  StyledWorkspace,
} from './styles';

interface Props {
  isLoading: boolean;
  injectedFilter: React.ReactNode;
  typeSearch: React.ReactNode;
  filter: React.ReactNode;
  overview: React.ReactNode;
  detail?: React.ReactNode;
}

export default function Layout(props: Props) {
  const { isLoading, injectedFilter, typeSearch, filter, overview, detail } = props;
  return (
    <StyledLayout>
      <Loader show={isLoading} />
      <StyledLeftPanel>
        <StyledInjectedFilter>{injectedFilter}</StyledInjectedFilter>
        <StyledTypeSearch>{typeSearch}</StyledTypeSearch>
      </StyledLeftPanel>
      <StyledRightPanel>
        <StyledFilter>{filter}</StyledFilter>
        <StyledWorkspace>
          <StyledOverview>{overview}</StyledOverview>
          {detail && <StyledDetail>{detail}</StyledDetail>}
        </StyledWorkspace>
      </StyledRightPanel>
    </StyledLayout>
  );
}
