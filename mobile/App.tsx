import { useState } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createApplicationComposition } from './src/app/composition/createApplicationComposition';

import { defaultAppConfig } from './src/core/config/DefaultAppConfig';

import { AppNavigator } from './src/navigation/AppNavigator';

import { AppThemeProvider } from './src/shared/theme/AppThemeProvider';
import { defaultTheme } from './src/shared/theme/defaultTheme';

export default function App() {
  const [composition] = useState(() => createApplicationComposition(defaultAppConfig));

  return (
    <SafeAreaProvider>
      <AppThemeProvider theme={defaultTheme}>
        <AppNavigator auth={composition.auth} />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
