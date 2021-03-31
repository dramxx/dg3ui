/*
 * This script takes the extracted string outputted by babel-react-intl plugin
 * and generates two files per supported locale. This library tracks translations
 * and makes sure there are no duplicate keys
 */
const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'dist/i18n/',
  translationsDirectory: 'i18n/locales/',
  languages: ['cs'], // Any needed translations --- no need to include the default language, will use default messages
});
