import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ErrorLabel, LoadingSpinner, PrimaryButton } from '@dg3/components';
import { useDetailElementIdentification } from '@dg3/graphql';
import { CloseIcon } from '@dg3/icons';
import { DetailProvider } from '@dg3/types';

const StyledDetailContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
`;

const StyledDetailHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary2};
  padding-bottom: ${(props) => props.theme.spacing.small};
`;

const StyledCloseButton = styled(PrimaryButton)`
  min-width: 24px;
  padding: 0;
  .icon {
    fill: ${(props) => props.theme.colors.white};
    stroke: ${(props) => props.theme.colors.white};
    stroke-width: 2px;
  }
`;

const StyledContent = styled.div`
  overflow-y: auto;
`;

const StyledTitle = styled.div`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.big};
  margin-left: ${(props) => props.theme.spacing.small};
`;

interface Props {
  id: string;
  detailProvider: DetailProvider;
  overviewModule: string;
  overviewId: string;
}

export const DetailPage: FC<Props> = (props) => {
  const { id, detailProvider: Detail, overviewModule, overviewId } = props;
  const history = useHistory();
  const baseOverviewUrl = `/${overviewModule}/overview/${overviewId}`;

  const { loading, error, element } = useDetailElementIdentification(id);

  if (loading) return <LoadingSpinner />;
  if (error) {
    return <ErrorLabel>{`Error: ${error.message}`}</ErrorLabel>;
  }

  const handleDetailClose = () => {
    history.push(baseOverviewUrl);
  };

  return (
    <StyledDetailContent>
      <StyledDetailHeader>
        <StyledCloseButton onClick={handleDetailClose}>
          <CloseIcon className={'icon'} height={'24px'} />
        </StyledCloseButton>
        <StyledTitle>
          {element.localization.name} {element.externalId}
        </StyledTitle>
      </StyledDetailHeader>
      <StyledContent>
        <Detail
          elementId={element.internalId}
          typeName={element.typeName}
          overviewModule={overviewModule}
        />
      </StyledContent>
    </StyledDetailContent>
  );
};
