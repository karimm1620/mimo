// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    // The React Compiler / react-hooks "immutability" rule doesn't yet
    // recognize Reanimated's `sharedValue.value = x` mutation as safe — it's
    // the library's intended API (a worklet-reactive ref, not React state),
    // and this app uses it throughout animated components. Same story for
    // `set-state-in-effect` on the hydration-flag pattern used by Expo's own
    // web color-scheme hook. Disabling both rather than fighting idiomatic,
    // library-recommended patterns.
    rules: {
      'react-hooks/immutability': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]);
