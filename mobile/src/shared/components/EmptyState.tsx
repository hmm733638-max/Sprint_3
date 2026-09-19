import { ReactNode } from 'react';

import { Text, View } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

interface EmptyStateProps {
  readonly title: string;

  readonly message?: string;

  readonly illustration?: ReactNode;

  readonly action?: ReactNode;
}

export function EmptyState({ title, message, illustration, action }: EmptyStateProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',

        padding: theme.spacing.xl,

        gap: theme.spacing.md,
      }}
    >
      {illustration}

      <Text
        style={{
          color: theme.colors.textPrimary,

          fontSize: theme.typography.fontSize.xl,

          fontWeight: theme.typography.fontWeight.bold,

          textAlign: 'center',
        }}
      >
        {title}
      </Text>

      {message ? (
        <Text
          style={{
            color: theme.colors.textSecondary,

            fontSize: theme.typography.fontSize.md,

            lineHeight: theme.typography.lineHeight.md,

            textAlign: 'center',
          }}
        >
          {message}
        </Text>
      ) : null}

      {action}
    </View>
  );
}
