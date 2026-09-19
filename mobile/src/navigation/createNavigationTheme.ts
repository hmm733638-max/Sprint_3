import {
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';

import { AppTheme } from '../shared/theme/AppTheme';

export function createNavigationTheme(theme: AppTheme): NavigationTheme {
  return {
    ...NavigationDefaultTheme,

    colors: {
      ...NavigationDefaultTheme.colors,

      primary: theme.colors.brandPrimary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.textPrimary,
      border: theme.colors.border,
      notification: theme.colors.danger,
    },
  };
}
