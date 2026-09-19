import { useContext } from 'react';

import { AppTheme } from './AppTheme';
import { AppThemeContext } from './AppThemeContext';

export function useAppTheme(): AppTheme {
  const theme = useContext(AppThemeContext);

  if (!theme) {
    throw new Error('useAppTheme debe utilizarse dentro de AppThemeProvider.');
  }

  return theme;
}
