module.exports = {
  presets: [
    ['module:react-native-builder-bob/babel-preset', { modules: 'commonjs' }],
    'babel-preset-expo',
  ],
  plugins: ['react-native-reanimated/plugin'],
};
