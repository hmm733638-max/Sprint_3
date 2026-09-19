import { Text, View } from 'react-native';

import { AppCard } from '../../../shared/components/AppCard';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

interface FeaturePlaceholderScreenProps {
  readonly title: string;

  readonly description: string;
}

export function FeaturePlaceholderScreen({ title, description }: FeaturePlaceholderScreenProps) {
  const theme = useAppTheme();

  return (
    <ScreenContainer
      contentStyle={{
        justifyContent: 'center',
      }}
    >
      <AppCard
        variant="outlined"
        style={{
          gap: theme.spacing.md,
        }}
      >
        <View
          style={{
            gap: theme.spacing.xs,
          }}
        >
          <Text
            accessibilityRole="header"
            style={{
              color: theme.colors.textPrimary,

              fontSize: theme.typography.fontSize.title,

              lineHeight: theme.typography.lineHeight.title,

              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            {title}
          </Text>

          <Text
            style={{
              color: theme.colors.textSecondary,

              fontSize: theme.typography.fontSize.md,

              lineHeight: theme.typography.lineHeight.md,
            }}
          >
            {description}
          </Text>
        </View>
      </AppCard>
    </ScreenContainer>
  );
}
