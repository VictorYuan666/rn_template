module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    development: {},
    production: {
      plugins: ['transform-remove-console', 'transform-remove-debugger'],
    },
  },
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['import', {libraryName: '@ant-design/react-native'}],
    // "lodash",
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./'],
        alias: {
          '@app': './app',
          '@pages': './app/pages',
          '@store': './app/store',
          '@components': './app/components',
          '@utils': './app/utils',
          '@themes': './app/themes',
          '@navigation': './app/navigation',
          '@assets': './app/assets',
          '@constants': './app/constants',
        },
        extensions: ['.ios.js', '.android.js', '.native.js', '.js', '.json'],
      },
    ],
  ],
};
