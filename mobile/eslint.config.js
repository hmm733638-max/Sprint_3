const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,

  eslintPluginPrettierRecommended,

  {
    ignores: ['node_modules/**', '.expo/**', 'coverage/**', 'dist/**'],
  },

  /*
   * DOMAIN
   *
   * La capa de dominio debe ser TypeScript puro.
   * No puede conocer React, React Native, navegación,
   * almacenamiento, Expo ni las otras capas externas.
   */
  {
    files: ['src/domain/**/*.{ts,tsx}'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              message: 'Domain no puede depender de React.',
            },
            {
              name: 'react-native',
              message: 'Domain no puede depender de React Native.',
            },
            {
              name: '@react-native-async-storage/async-storage',
              message: 'Domain no puede depender de AsyncStorage.',
            },
          ],

          patterns: [
            {
              group: [
                'expo',
                'expo-*',
                '@expo/**',
                '@react-navigation/**',
                '**/data/**',
                '**/presentation/**',
                '**/navigation/**',
              ],

              message: 'Domain debe permanecer independiente de infraestructura y presentación.',
            },
          ],
        },
      ],
    },
  },

  /*
   * PRESENTATION
   *
   * MVVM: Screens y ViewModels no pueden saltarse
   * Domain para acceder directamente a Data.
   */
  {
    files: ['src/presentation/**/*.{ts,tsx}'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/data/**'],

              message:
                'Presentation no puede importar implementaciones de Data directamente. Usa Domain + DI.',
            },
          ],
        },
      ],
    },
  },
]);
