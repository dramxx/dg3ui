import React from 'react';
import { LinkWithoutRedirect } from './LinkWithoutRedirect';

export default {
  component: LinkWithoutRedirect,
  title: 'LinkWithoutRedirect',
};

export const basic = () => (
  <LinkWithoutRedirect disabled={false} icon={false} onClick={() => {}}>
    Test link
  </LinkWithoutRedirect>
);

export const withIcon = () => (
  <LinkWithoutRedirect disabled={false} icon={true} onClick={() => {}}>
    Test link
  </LinkWithoutRedirect>
);

export const disabled = () => (
  <LinkWithoutRedirect disabled={true} icon={true} onClick={() => {}}>
    Test link
  </LinkWithoutRedirect>
);
