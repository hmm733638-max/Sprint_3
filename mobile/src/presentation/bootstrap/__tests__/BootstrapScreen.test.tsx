import { describe, expect, it } from '@jest/globals';

import { render } from '@testing-library/react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppThemeProvider } from '../../../shared/theme/AppThemeProvider';
import { defaultTheme } from '../../../shared/theme/defaultTheme';

import { BootstrapScreen } from '../screens/BootstrapScreen';

const initialMetrics = {
  frame: {
    x: 0,
    y: 0,
    width: 390,
    height: 844,
  },

  insets: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

describe('BootstrapScreen', () => {
  it('renders the Changarrito base application', async () => {
    const screen = await render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <AppThemeProvider theme={defaultTheme}>
          <BootstrapScreen />
        </AppThemeProvider>
      </SafeAreaProvider>,
    );

    expect(screen.getByText('Changarrito')).toBeTruthy();

    expect(screen.getByText('Todo tu changarro en un solo lugar.')).toBeTruthy();

    expect(screen.getByText('La arquitectura base está configurada correctamente.')).toBeTruthy();
  });
});
