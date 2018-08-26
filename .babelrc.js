// Babel configuration
// https://babeljs.io/docs/usage/api/
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/flow',
    '@babel/react',
  ],
  ignore: ['node_modules', 'build'],
};
