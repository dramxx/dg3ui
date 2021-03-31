import { useReactiveVar } from '@apollo/client';
import { isNil } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { DgGraphiqlContainer } from '@dg3/graphiql';
import {
  addNewChipIntoContentFilter,
  contentFilterVar,
  messages as filterChipMessages,
  simpleFilterToGraphql,
  useNotification,
} from '@dg3/graphql';
import {
  CORE_ELEMENT_FILTER_NAME,
  ContentFilterTypeKey,
  CoreElementKey,
  DuplicateChipError,
  FilterChip,
} from '@dg3/types';
import { randomId } from '@dg3/utils';
import { ContentFilterFooter } from './ContentFilterFooter';

const StyledExpertTab = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledQuery = styled.div<{ error: string }>`
  border: 1px solid
    ${(props) =>
      props.error ? props.theme.colors.red : props.theme.colors.grey2};
  width: 282px;
  height: 290px;

  .CodeMirror-gutter-wrapper {
    left: -38px !important;
  }

  .CodeMirror-gutters {
    left: 0 !important;
  }

  .CodeMirror {
    height: 288px;
  }
`;

interface Props {
  value: FilterChip;
  onTabChange: () => void;
  onClose: () => void;
}

export const ExpertModeTab: React.FC<Props> = (props: Props) => {
  const [variables, setVariables] = useState('');
  const [edited, setEdited] = useState(false);
  const [parsingError, setParsingError] = useState('');
  const contentFilter = useReactiveVar(contentFilterVar);
  const notification = useNotification();
  const intl = useIntl();

  const EXPERT_FILTER: ContentFilterTypeKey = 'EXPERT';

  useEffect(() => {
    if (isNil(props.value)) return;

    const { coreEl, value, type } = props.value;
    const coreElKey = CORE_ELEMENT_FILTER_NAME[coreEl];
    if (isNil(value)) return;
    const variable = {
      [coreElKey]: {},
    };

    if (type === EXPERT_FILTER) {
      variable[coreElKey] = JSON.parse(value);
      setEdited(true);
    } else {
      variable[coreElKey] = simpleFilterToGraphql(JSON.parse(value));
    }

    setVariables(JSON.stringify(variable, null, 2));
  }, [props.value]);

  const getExpertFilterName = (chips: Array<FilterChip>): string => {
    const expertChipsCount =
      chips.filter((item) => item.type === EXPERT_FILTER).length + 1;
    return `graphQL_${expertChipsCount}`;
  };

  const createNewFilterChip = (key: CoreElementKey, filter: string) => {
    const condition: FilterChip = {
      id: randomId(),
      label: getExpertFilterName(contentFilter.chips),
      coreEl: key,
      type: EXPERT_FILTER,
      value: filter,
    };

    try {
      contentFilterVar(addNewChipIntoContentFilter(condition, contentFilter));
    } catch (e) {
      if (e instanceof DuplicateChipError) {
        notification.warning(
          intl.formatMessage(filterChipMessages.filterExists)
        );
      } else {
        console.error(e);
      }
    }
  };

  const updateFilterChip = (key: CoreElementKey, filter: string) => {
    const condition: FilterChip = {
      id: props?.value?.id ? props.value.id : randomId(),
      label:
        props.value.type === EXPERT_FILTER
          ? props.value.label
          : getExpertFilterName(contentFilter.chips),
      coreEl: key,
      type: EXPERT_FILTER,
      value: filter,
    };

    try {
      contentFilterVar(addNewChipIntoContentFilter(condition, contentFilter));
    } catch (e) {
      if (e instanceof DuplicateChipError) {
        notification.warning(
          intl.formatMessage(filterChipMessages.filterExists)
        );
      } else {
        console.error(e);
      }
    }
  };

  const handleClick = () => {
    try {
      const result = /\S/.test(variables) ? JSON.parse(variables) : null;
      setParsingError('');

      Object.keys(CORE_ELEMENT_FILTER_NAME).forEach((key: CoreElementKey) => {
        const filterName = CORE_ELEMENT_FILTER_NAME[key];
        const filter = JSON.stringify(result[filterName]);
        if (isNil(filter)) return;

        isNil(props.value)
          ? createNewFilterChip(key, filter)
          : updateFilterChip(key, filter);
      });
      setEdited(false);
      props.onClose();
    } catch (e) {
      setParsingError(e.message);
    }
  };

  const handleVarsEdit = (vars: string) => {
    setVariables(vars);
    setEdited(!!vars);
    setParsingError('');
  };

  return (
    <StyledExpertTab>
      <StyledQuery error={parsingError}>
        <DgGraphiqlContainer
          variables={variables}
          onVariablesEdit={handleVarsEdit}
        />
      </StyledQuery>
      <ContentFilterFooter
        disabledRoute={edited}
        expertMode={true}
        edit={!!props.value}
        disabled={!variables || !!parsingError}
        handleClick={handleClick}
        onTabChange={props.onTabChange}
      />
    </StyledExpertTab>
  );
};
