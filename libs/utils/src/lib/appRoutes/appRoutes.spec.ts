import { getAppModuleFromUrl } from '@dg3/utils';
import { HOMEPAGE_MODULE } from '@dg3/types';

describe('getAppModuleFromUrl', () => {
  it('getAppModuleFromUrl empty url', () => {
    expect(getAppModuleFromUrl('')).toEqual(HOMEPAGE_MODULE);
  });

  it('getAppModuleFromUrl root url', () => {
    expect(getAppModuleFromUrl('/')).toEqual('PANE');
  });

  it('getAppModuleFromUrl some valid url', () => {
    expect(getAppModuleFromUrl('/DEVI')).toEqual('DEVI');
  });

  it('getAppModuleFromUrl some valid url with id', () => {
    expect(getAppModuleFromUrl('/DEVI/1234')).toEqual('DEVI');
  });
});
