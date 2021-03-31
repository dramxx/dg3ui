import { configure, addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import csLocale from 'date-fns/locale/cs';
import enLocale from 'date-fns/locale/en-US';

import StoriesBaseDecorator from '../src/lib/Theme/test/StoriesBaseDecorator';
import { defaultTheme } from '../src/lib/Theme/defaultTheme';
import messages_cs from '../../../i18n/locales/cs.json';
import { defaultVGATheme } from '../src/lib/Theme/defaultVGATheme';
import { withLocaleTable } from '../../utils/src';

const themes = [defaultTheme, defaultVGATheme];

/**
 * Sets up general pre-sets for all stories
 * currently imports basic global styles settings
 */
addDecorator(StoriesBaseDecorator);
addDecorator(withThemesProvider(themes));

/** configures locale switching */
const messages = {
  en: null, // default language
  cs: messages_cs,
};
setIntlConfig({
  locales: ['en', 'cs'],
  defaultLocale: 'en',
  getMessages: (locale) => messages[locale],
});
addDecorator(withIntl);

const localeTable = {
  cs: csLocale,
  en: enLocale,
}
addDecorator(withLocaleTable(localeTable))

//  FIXME add locale decorator

/** automatically import all files ending in *.stories.js | .tsx | .mdx */
configure(
  require.context('../../../libs', true, /\.stories\.(js|tsx|mdx)$/),
  module
);
