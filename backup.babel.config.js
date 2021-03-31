const plugins = [
  '@babel/plugin-transform-modules-commonjs',
  ['@babel/plugin-proposal-class-properties', { loose: true }],
];

const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
    },
  ],
];

const ignore = [];

module.exports = {
  plugins,
  presets,
  ignore,
};
