import { View } from 'react-native';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

export function ProductDetailSkeleton() {
  const theme = useAppTheme();

  return (
    <View
      style={{
        gap: theme.spacing.lg,
      }}
    >
      <View
        style={{
          width: '100%',
          aspectRatio: 1,

          borderRadius: theme.radii.card,

          backgroundColor: theme.colors.surfaceDisabled,
        }}
      />

      <View
        style={{
          height: 18,
          width: '35%',

          borderRadius: theme.radii.sm,

          backgroundColor: theme.colors.surfaceDisabled,
        }}
      />

      <View
        style={{
          height: 28,
          width: '85%',

          borderRadius: theme.radii.sm,

          backgroundColor: theme.colors.surfaceDisabled,
        }}
      />

      <View
        style={{
          height: 28,
          width: '40%',

          borderRadius: theme.radii.sm,

          backgroundColor: theme.colors.surfaceDisabled,
        }}
      />

      <View
        style={{
          gap: theme.spacing.sm,
        }}
      >
        <View
          style={{
            height: 14,
            width: '100%',

            borderRadius: theme.radii.sm,

            backgroundColor: theme.colors.surfaceDisabled,
          }}
        />

        <View
          style={{
            height: 14,
            width: '95%',

            borderRadius: theme.radii.sm,

            backgroundColor: theme.colors.surfaceDisabled,
          }}
        />

        <View
          style={{
            height: 14,
            width: '70%',

            borderRadius: theme.radii.sm,

            backgroundColor: theme.colors.surfaceDisabled,
          }}
        />
      </View>
    </View>
  );
}
