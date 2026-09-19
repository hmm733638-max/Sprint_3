import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/navigation/AppNavigator';

import { AppThemeProvider } from './src/shared/theme/AppThemeProvider';
import { defaultTheme } from './src/shared/theme/defaultTheme';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider theme={defaultTheme}>
        <AppNavigator />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
