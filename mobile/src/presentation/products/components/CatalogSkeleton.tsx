import { View } from 'react-native';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

export function CatalogSkeleton() {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',

        gap: theme.spacing.md,
      }}
    >
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <View
          key={index}
          style={{
            width: '47%',

            borderRadius: theme.radii.card,

            overflow: 'hidden',

            borderWidth: 1,
            borderColor: theme.colors.border,

            backgroundColor: theme.colors.surface,
          }}
        >
          <View
            style={{
              width: '100%',
              aspectRatio: 1,

              backgroundColor: theme.colors.surfaceDisabled,
            }}
          />

          <View
            style={{
              padding: theme.spacing.md,

              gap: theme.spacing.sm,
            }}
          >
            <View
              style={{
                height: 14,
                width: '90%',

                borderRadius: theme.radii.sm,

                backgroundColor: theme.colors.surfaceDisabled,
              }}
            />

            <View
              style={{
                height: 14,
                width: '65%',

                borderRadius: theme.radii.sm,

                backgroundColor: theme.colors.surfaceDisabled,
              }}
            />

            <View
              style={{
                height: 20,
                width: '45%',

                marginTop: theme.spacing.xs,

                borderRadius: theme.radii.sm,

                backgroundColor: theme.colors.surfaceDisabled,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
