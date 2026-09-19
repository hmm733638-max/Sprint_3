import { ReactNode } from 'react';

import { Text, View } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

interface AppHeaderProps {
  readonly title: string;

  readonly subtitle?: string;

  readonly leftAccessory?: ReactNode;

  readonly rightAccessory?: ReactNode;
}

export function AppHeader({ title, subtitle, leftAccessory, rightAccessory }: AppHeaderProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        minHeight: theme.sizes.header.height,

        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: theme.spacing.md,

        paddingVertical: theme.spacing.sm,

        gap: theme.spacing.md,

        backgroundColor: theme.colors.surface,
      }}
    >
      {leftAccessory}

      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: theme.colors.textPrimary,

            fontSize: theme.typography.fontSize.xl,

            lineHeight: theme.typography.lineHeight.xl,

            fontWeight: theme.typography.fontWeight.bold,
          }}
        >
          {title}
        </Text>

        {subtitle ? (
          <Text
            numberOfLines={1}
            style={{
              color: theme.colors.textSecondary,

              fontSize: theme.typography.fontSize.sm,
            }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {rightAccessory}
    </View>
  );
}
