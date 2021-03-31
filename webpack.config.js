const getConfig = require('@nrwl/react/plugins/babel');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackMildCompile = require('webpack-mild-compile').Plugin;
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DotenvPlugin = require('dotenv-webpack');

module.exports = (config) => {
  config = getConfig(config);

  const babelLoaderRules = config.module.rules.find(
    (r) => r.loader === 'babel-loader'
  );

  babelLoaderRules.exclude = /node_modules\/(?!@projectstorm|graphiql|graphql|puny).*/;

  /* Babel plugins injection  */
  const babelRulePluginOptions = babelLoaderRules.options.plugins;

  const reactIntlPlugin = [
    'react-intl',
    {
      messagesDir: './dist/i18n/',
    },
  ];

  babelRulePluginOptions.push('@babel/plugin-proposal-optional-chaining');
  babelRulePluginOptions.push(
    '@babel/plugin-proposal-nullish-coalescing-operator'
  );
  babelRulePluginOptions.push(reactIntlPlugin);
  if (config.mode === 'development') {
    babelRulePluginOptions.push([
      'babel-plugin-styled-components',
      { fileName: false },
    ]);
  }
  /* End of babel plugins */


  const dotenvPlugin = new DotenvPlugin({ systemvars: true })
  const devPlugins = config.devServer ? [dotenvPlugin, new WebpackMildCompile()] : [];

  return {
    ...config,

    // required in order to suppress console warnings during build
    stats: 'errors-only',
    node: {
      global: true,
      fs: 'empty',
    },
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'pg-native': path.join(__dirname, 'aliases/pg-native.js'),
      },
    },
    plugins: [
      ...config.plugins,
      ...devPlugins,
      new CopyPlugin([
        {
          from: `${__dirname}/static/`,
          to: 'static/',
        },
      ]),
      new BundleAnalyzerPlugin({
        // Temporarly disable use only when needed, it signnificantly increase build time
         analyzerMode: 'disabled',
        openAnalyzer: false,
      }),

    ],
  };
};
