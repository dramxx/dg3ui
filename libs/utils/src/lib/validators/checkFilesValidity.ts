import { isEmpty } from 'ramda';

import { FileValidator } from '@dg3/types';

export const checkFilesValidity = (
  files: Array<File>,
  fileValidators: Array<FileValidator>
) => {
  const errorMessages = [];

  if (fileValidators && !isEmpty(fileValidators)) {
    fileValidators.forEach((validator) => {
      files.forEach((file) => {
        if (!validator.validate(file)) {
          errorMessages.push(validator.errorMessage);
        }
      });
    });
  }

  return errorMessages;
};
