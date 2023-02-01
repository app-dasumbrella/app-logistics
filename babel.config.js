module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true },],
    ['react-native-reanimated/plugin'],
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blocklist": null,
      "allowlist": null,
      "blacklist": null, // DEPRECATED
      "whitelist": null, // DEPRECATED
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    }],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          "@app": ["src"],
          "@screens": ["screens"],
          "@containers": ["containers"],
          "@components": ["components"],
          "@common": ["common"],
          "@images": ["images"],
          "@services": ["services"],
          "@data": ["data"],
          "@store": ["store"],
          "@utils": ["utils"],
          "@redux": ["redux"],
        }
      }
    ],
    'jest-hoist'
  ]
};