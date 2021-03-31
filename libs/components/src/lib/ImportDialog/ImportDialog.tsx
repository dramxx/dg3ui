import { isEmpty } from 'ramda';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { FileValidator } from '@dg3/types';
import { checkFilesValidity } from '@dg3/utils';
import { DialogButtons } from '../Button/DialogButtons';
import { ContainerContent } from './ContainerContent';
import { messages } from './messages';

type SelectedProps = {
  isSelected: boolean;
};

const StyledWrapper = styled.div<SelectedProps>`
  width: fit-content;
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.grey1 : props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.normal};
`;

const StyledHeader = styled.div`
  line-height: ${(props) => props.theme.fontSize.normal};
`;

const StyledContainer = styled.div<SelectedProps & { isInvalid: boolean }>`
  height: 280px;
  width: 280px;
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.white : props.theme.colors.grey1};
  border: ${(props) =>
    props.isInvalid
      ? `2px solid ${props.theme.colors.red}`
      : `1px solid ${props.theme.colors.grey2}`};
  margin-top: ${(props) =>
    props.isSelected ? 'inherit' : props.theme.fontSize.normal};
  margin-bottom: ${(props) => props.theme.spacing.normal};
  border-radius: ${(props) => props.theme.radius.small};
  display: flex;
  justify-content: ${(props) => (props.isSelected ? 'unset' : 'center')};
  align-items: ${(props) => (props.isSelected ? 'unset' : 'center')};
  flex-direction: column;
  cursor: pointer;
  :focus {
    outline: none;
  }
  :hover {
    border: 1px solid ${(props) => props.theme.colors.primary2};
  }
`;

const StyledError = styled.div`
  color: ${(props) => props.theme.colors.red};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

type Props = {
  onImport: (files: Array<File>) => void;
  onClose?: () => void;
  fileValidators?: Array<FileValidator>;
};

export const ImportDialog: React.FC<Props> = (props: Props) => {
  const { onImport, onClose, fileValidators } = props;
  const [errors, setErrors] = useState<Array<string>>([]);
  const [files, setFiles] = useState<Array<File>>([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const isSelected = !isEmpty(files);
  const invalidFiles = !isEmpty(errors);

  const handleClose = () => {
    setFiles([]);
    if (onClose) {
      onClose();
    }
  };
  const handleImport = () => {
    const errorMessages = checkFilesValidity(files, fileValidators);

    if (!isEmpty(errorMessages)) {
      setErrors(errorMessages);
      return;
    }
    onImport(files);
    handleClose();
  };

  return (
    <StyledWrapper isSelected={isSelected}>
      {isSelected && (
        <StyledHeader>
          <FormattedMessage {...messages.selectedFiles} />
        </StyledHeader>
      )}
      <StyledContainer
        isSelected={isSelected}
        {...getRootProps()}
        isInvalid={invalidFiles}
      >
        <input {...getInputProps()} />
        <ContainerContent isSelected={isSelected} files={files} />
      </StyledContainer>
      {invalidFiles && <StyledError>{errors.map((err) => err)}</StyledError>}
      <DialogButtons
        onClose={handleClose}
        onConfirm={handleImport}
        confirmLabel={<FormattedMessage {...messages.import} />}
        isConfirmEnabled={isSelected}
      />
    </StyledWrapper>
  );
};
