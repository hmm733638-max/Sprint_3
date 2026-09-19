import { createContext } from 'react';

import { AppTheme } from './AppTheme';

export const AppThemeContext = createContext<AppTheme | undefined>(undefined);
