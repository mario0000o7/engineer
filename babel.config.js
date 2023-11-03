module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '~/components': './src/components',
            '~/assets': './src/assets',
            '~/router': './src/router',
            '~/screens': './src/screens',
            '~/redux': './src/redux',
            '~/hooks': './src/hooks',
            '~/styles': './src/styles'
          }
        }
      ],
      'react-native-paper/babel',
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin'
    ]
  };
};
