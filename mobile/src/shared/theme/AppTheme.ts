import { colors } from './colors';
import { radii } from './radii';
import { shadows } from './shadows';
import { sizes } from './sizes';
import { spacing } from './spacing';
import { typography } from './typography';

export interface AppTheme {
  readonly colors: typeof colors;

  readonly spacing: typeof spacing;

  readonly radii: typeof radii;

  readonly typography: typeof typography;

  readonly shadows: typeof shadows;

  readonly sizes: typeof sizes;
}
