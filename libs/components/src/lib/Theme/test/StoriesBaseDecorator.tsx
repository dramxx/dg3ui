import * as React from 'react';
/** CSS import */
import GlobalStyles from '../styles/globalStyles';
import SanitizeResetStyle from '../styles/sanitizeResetStyle';

export default (story: () => React.ReactElement) => (
  <React.Fragment>
    <SanitizeResetStyle />
    <GlobalStyles />
    <div style={{ padding: '1rem' }}>{story()}</div>
  </React.Fragment>
);
