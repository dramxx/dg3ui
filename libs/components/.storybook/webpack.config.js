const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/** Export a function. Accept the base config as the only param. */
module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        // using babel-loader instead of ts-loader is necessary for the use of babel-plugin-styled-components
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'entry',
                corejs: 3,
                modules: false,
                targets: { esmodules: true },
                exclude: ['transform-typeof-symbol'],
              },
            ],
            ['@babel/preset-react', { useBuiltIns: true }],
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-class-properties',
            ['babel-plugin-styled-components', { fileName: false }],
          ],
        },
      },
      // Optional - enable  when you want to also see components interface documentation
      // {
      //   loader: require.resolve('react-docgen-typescript-loader'),
      // },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.plugins = [
    new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../../../tsconfig.json'),
    }),
  ];
  config.node = {
    global: true,
    fs: 'empty',
  };
  return config;
};
