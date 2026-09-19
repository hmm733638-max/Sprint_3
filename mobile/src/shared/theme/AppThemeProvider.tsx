import { PropsWithChildren } from 'react';

import { AppTheme } from './AppTheme';
import { AppThemeContext } from './AppThemeContext';

interface AppThemeProviderProps extends PropsWithChildren {
  readonly theme: AppTheme;
}

export function AppThemeProvider({ theme, children }: AppThemeProviderProps) {
  return <AppThemeContext.Provider value={theme}>{children}</AppThemeContext.Provider>;
}
