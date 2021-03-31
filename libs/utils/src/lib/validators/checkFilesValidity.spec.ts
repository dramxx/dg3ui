import { FileValidator } from '@dg3/types';
import { suffixValidator } from '@dg3/utils';
import * as cut from './checkFilesValidity';

describe('checkFilesValidator', () => {
  it('undefined validators and files', () => {
    const fileValidators: Array<FileValidator> = undefined;
    const files: Array<File> = [];

    expect(cut.checkFilesValidity(files, fileValidators)).toEqual([]);
  });
  it('empty validators and files', () => {
    const fileValidators: Array<FileValidator> = [];
    const files: Array<File> = [];

    expect(cut.checkFilesValidity(files, fileValidators)).toEqual([]);
  });
  it('valid .json suffix', () => {
    const templateSuffixValidator: FileValidator = {
      validate: (file: File) => suffixValidator(file.name, '.json'),
      errorMessage: 'invalid file suffix',
    };

    const file = new File(['{"foo"}'], 'foo.json', {
      type: 'application/json',
    });

    expect(cut.checkFilesValidity([file], [templateSuffixValidator])).toEqual(
      []
    );
  });

  it('invalid .json suffix', () => {
    const templateSuffixValidator: FileValidator = {
      validate: (file: File) => suffixValidator(file.name, '.json'),
      errorMessage: 'invalid file suffix',
    };

    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    });

    expect(cut.checkFilesValidity([file], [templateSuffixValidator])).toEqual([
      'invalid file suffix',
    ]);
  });
});
