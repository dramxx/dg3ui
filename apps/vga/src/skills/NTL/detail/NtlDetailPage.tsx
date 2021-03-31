import { useReactiveVar } from '@apollo/client';
import { addDays, differenceInDays } from 'date-fns';
import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { timeFilterVar } from '@dg3/graphql';
import { GqlWidgetConfig } from '@dg3/schema';
import { GqlCardsConfig } from '@dg3/types';
import { messages } from '../messages';
import { NTL_SUBSTATIONS_DETAIL_GQL } from '../tables/NtlSubstationDetailGql';
import { NTL_SUSP_DETAIL_GQL } from '../tables/NtlSuspicionDetailGql';
import { VGAPage } from '../vga/VGAPage';
import { NtlDetailCards } from './NtlDetailCards';
import { NtlDetailTable } from './NtlDetailTable';
import { NTL_SUBSTATIONS_DETAIL_CARDS_GQL } from './NtlSubstationDetailCardsDefinition';
import { NTL_SUSPICION_DETAIL_CARDS_GQL } from './NtlSuspicionsDetailCardsDefinition';

const getConfig: (
  module: string
) => { cards: GqlCardsConfig; table: GqlWidgetConfig } | undefined = (
  module
) => {
  switch (module) {
    case 'substations':
      return {
        cards: NTL_SUBSTATIONS_DETAIL_CARDS_GQL,
        table: NTL_SUBSTATIONS_DETAIL_GQL,
      };
    case 'suspicions':
      return {
        cards: NTL_SUSPICION_DETAIL_CARDS_GQL,
        table: NTL_SUSP_DETAIL_GQL,
      };
    default:
      return undefined;
  }
};

const StyledContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTableWrapper = styled.div`
  width: 100%;
  height: 160px;
`;

const StyledWarning = styled.div`
  color: ${(props) => props.theme.colors.red};
`;

const StyledVgaWrapper = styled.div`
  width: 100%;
  height: 50vh;
  max-height: 50vh;
`;

interface Props {
  elementId: string;
  overviewModule: string;
}

export const NtlDetailPage: React.FC<Props> = (props: Props) => {
  const { elementId, overviewModule } = props;

  const timeFilter = useReactiveVar(timeFilterVar);

  const config = getConfig(overviewModule);

  const from = new Date(timeFilter.from);

  const oversizedInterval =
    differenceInDays(new Date(timeFilter.to), new Date(timeFilter.from)) > 5;

  const to = oversizedInterval ? addDays(from, 5) : new Date(timeFilter.to);

  // TODO: get transformer ID from dio object
  const transformerId =
    overviewModule === 'substations' ? elementId : 'TRANSF_608656';

  return (
    <StyledContent>
      <NtlDetailCards id={elementId} config={config.cards} />
      {overviewModule === 'substations' && (
        <StyledTableWrapper>
          <NtlDetailTable id={elementId} config={NTL_SUBSTATIONS_DETAIL_GQL} />
        </StyledTableWrapper>
      )}
      {oversizedInterval && (
        <StyledWarning>
          <FormattedMessage
            {...messages.intervalWarning}
            values={{
              from: <FormattedDate value={from} />,
              to: <FormattedDate value={to} />,
            }}
          />
        </StyledWarning>
      )}
      <StyledVgaWrapper>
        <VGAPage id={transformerId} from={from} to={to} />
      </StyledVgaWrapper>
    </StyledContent>
  );
};
