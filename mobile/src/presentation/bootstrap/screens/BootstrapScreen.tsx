import { Text, View } from 'react-native';

import { InfoBanner } from '../../../shared/components/InfoBanner';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';
import { useAppTheme } from '../../../shared/theme/useAppTheme';

export function BootstrapScreen() {
  const theme = useAppTheme();

  return (
    <ScreenContainer>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',

          gap: theme.spacing.lg,
        }}
      >
        <View
          style={{
            gap: theme.spacing.sm,
          }}
        >
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.typography.fontSize.title,
              lineHeight: theme.typography.lineHeight.title,
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            Changarrito
          </Text>

          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.md,
              lineHeight: theme.typography.lineHeight.md,
            }}
          >
            Todo tu changarro en un solo lugar.
          </Text>
        </View>

        <InfoBanner tone="success" message="La arquitectura base está configurada correctamente." />
      </View>
    </ScreenContainer>
  );
}
