import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';

import {
  DialogButtons,
  Dropdown,
  DropdownMenuItem,
  includeActiveItemsInDropdownItems,
} from '@dg3/components';
import { messages } from './messages';

const StyledTaskDialogContent = styled.div`
  width: 500px;
  padding: ${(props) => props.theme.spacing.normal};

  .MuiRadio-colorSecondary,
  .MuiRadio-colorSecondary.Mui-checked {
    color: ${(props) => props.theme.colors.primary2};
  }
`;

const StyledTitle = styled.div`
  padding-bottom: ${(props) => props.theme.spacing.small};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const StyledLimit = styled.div`
  color: ${(props) => props.theme.colors.grey4};
  padding-left: ${(props) => props.theme.spacing.small};
  font-weight: ${(props) => props.theme.fontWeight.normal};
`;

const StyledBatchLimit = styled.div`
  color: ${(props) => props.theme.colors.grey4};
  margin-left: 23px;
  font-weight: ${(props) => props.theme.fontWeight.normal};
  margin-bottom: ${(props) => props.theme.spacing.normal};
`;

const StyledLabel = styled.div`
  display: flex;
  flex-direction: row;
  font-size: ${(props) => props.theme.fontSize.normal};
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing.small};
  margin-left: 23px;
`;

interface Props {
  templates: object;
  onTaskRun: (templateId: string) => void;
  onLocalExport: () => void;
  onClose: () => void;
}

const getTemplateItems = (templates: object): Array<DropdownMenuItem> => {
  return Object.keys(templates).map((key) => {
    const item = templates[key];
    return {
      id: key,
      label: item.NAME,
      active: false,
    };
  });
};

const getIntervalItems = (): Array<DropdownMenuItem> => {
  return [
    {
      id: 'WEEK',
      label: 'za tento týden',
      active: false,
    },
    {
      id: 'YESTERDAY',
      label: 'za včera',
      active: false,
    },
    {
      id: 'TODAY',
      label: 'za dnes',
      active: false,
    },
  ];
};

export const ExportDialogContent: React.FC<Props> = (props) => {
  const intl = useIntl();
  const { onClose, onTaskRun, templates, onLocalExport } = props;
  const [exportType, setExportType] = useState('selected');
  const [activeTemplate, setActiveTemplate] = useState(
    getTemplateItems(templates)[0].id
  );
  const [activeInterval, setActiveInterval] = useState(
    getIntervalItems()[0].id
  );

  const intervalItems = getIntervalItems();
  const templateItems = getTemplateItems(templates);

  const activeIntervalItem = intervalItems.find(
    (item) => item.id === activeInterval
  );

  const activeTemplateItem = templateItems.find(
    (item) => item.id === activeTemplate
  );

  const handleConfirm = () => {
    if (exportType === 'selected') {
      onLocalExport();
    } else {
      onTaskRun(templates[activeTemplate][activeInterval]);
    }
  };

  const handleChange = (event) => {
    setExportType(event.target.value);
  };

  const exportSelectedDataMessage = intl.formatMessage(
    messages.exportSelectedData
  );
  const maxItemsLimit = intl.formatMessage(messages.maxItemsLimit);
  const exportBatchDataMessage = intl.formatMessage(messages.exportBatchData);

  return (
    <StyledTaskDialogContent>
      <StyledTitle>
        <FormattedMessage {...messages.exportMeasuredData} />
      </StyledTitle>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="export_type"
          name="exportType"
          value={exportType}
          onChange={handleChange}
        >
          <FormControlLabel
            value="selected"
            control={<Radio />}
            label={
              <StyledLabel>
                {exportSelectedDataMessage}
                <StyledLimit>{maxItemsLimit}</StyledLimit>
              </StyledLabel>
            }
          />
          <FormControlLabel
            value="burst"
            control={<Radio />}
            label={<StyledLabel>{exportBatchDataMessage}</StyledLabel>}
          />
        </RadioGroup>
      </FormControl>
      <StyledSection>
        <StyledLabel>
          <FormattedMessage {...messages.template} />
        </StyledLabel>
        <Dropdown
          width={'200px'}
          items={includeActiveItemsInDropdownItems(
            templateItems,
            activeTemplateItem
          )}
          label={activeTemplateItem.label}
          onValueChange={setActiveTemplate}
        />
      </StyledSection>
      <StyledSection>
        <StyledLabel>
          <FormattedMessage {...messages.interval} />
        </StyledLabel>
        <Dropdown
          width={'200px'}
          items={includeActiveItemsInDropdownItems(
            intervalItems,
            activeIntervalItem
          )}
          label={activeIntervalItem.label}
          onValueChange={setActiveInterval}
        />
      </StyledSection>
      <StyledBatchLimit>
        <FormattedMessage {...messages.maxItemsBatchLimit} />
      </StyledBatchLimit>
      <DialogButtons
        onClose={onClose}
        onConfirm={handleConfirm}
        confirmLabel={<FormattedMessage {...messages.exportData} />}
        isConfirmEnabled={true}
      />
    </StyledTaskDialogContent>
  );
};
