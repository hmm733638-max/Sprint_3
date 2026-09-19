import { useEffect } from 'react';

import { Text, View } from 'react-native';

import { UserSession } from '../../../domain/entities/UserSession';

import { AppCard } from '../../../shared/components/AppCard';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

import { useViewModelState } from '../../common/hooks/useViewModelState';

import { LoginForm } from '../components/LoginForm';

import { LoginViewModel } from '../viewmodels/LoginViewModel';

interface LoginScreenProps {
  readonly viewModel: LoginViewModel;

  readonly onAuthenticated: (session: UserSession) => void;
}

export function LoginScreen({ viewModel, onAuthenticated }: LoginScreenProps) {
  const theme = useAppTheme();

  const state = useViewModelState(viewModel);

  useEffect(() => {
    if (state.status !== 'success' || state.session === null) {
      return;
    }

    onAuthenticated(state.session);

    viewModel.reset();
  }, [onAuthenticated, state.session, state.status, viewModel]);

  return (
    <ScreenContainer
      scrollable
      contentStyle={{
        justifyContent: 'center',

        paddingVertical: theme.spacing.xxxl,
      }}
    >
      <View
        style={{
          width: '100%',

          maxWidth: 480,

          alignSelf: 'center',

          gap: theme.spacing.xxl,
        }}
      >
        <View
          style={{
            alignItems: 'center',

            gap: theme.spacing.sm,
          }}
        >
          <View
            style={{
              width: 72,
              height: 72,

              alignItems: 'center',
              justifyContent: 'center',

              borderRadius: theme.radii.xxl,

              backgroundColor: theme.colors.brandPrimary,
            }}
          >
            <Text
              style={{
                color: theme.colors.textInverse,

                fontSize: theme.typography.fontSize.display,

                fontWeight: theme.typography.fontWeight.bold,
              }}
            >
              C
            </Text>
          </View>

          <Text
            accessibilityRole="header"
            style={{
              color: theme.colors.textPrimary,

              fontSize: theme.typography.fontSize.display,

              lineHeight: theme.typography.lineHeight.display,

              fontWeight: theme.typography.fontWeight.bold,

              textAlign: 'center',
            }}
          >
            Changarrito
          </Text>

          <Text
            style={{
              color: theme.colors.textSecondary,

              fontSize: theme.typography.fontSize.md,

              lineHeight: theme.typography.lineHeight.md,

              textAlign: 'center',
            }}
          >
            Todo tu changarro en un solo lugar.
          </Text>
        </View>

        <AppCard
          variant="elevated"
          style={{
            padding: theme.spacing.xl,

            gap: theme.spacing.lg,
          }}
        >
          <View
            style={{
              gap: theme.spacing.xs,
            }}
          >
            <Text
              style={{
                color: theme.colors.textPrimary,

                fontSize: theme.typography.fontSize.xxl,

                lineHeight: theme.typography.lineHeight.xxl,

                fontWeight: theme.typography.fontWeight.bold,
              }}
            >
              Bienvenido
            </Text>

            <Text
              style={{
                color: theme.colors.textSecondary,

                fontSize: theme.typography.fontSize.sm,

                lineHeight: theme.typography.lineHeight.sm,
              }}
            >
              Ingresa tus credenciales para continuar.
            </Text>
          </View>

          <LoginForm
            state={state}
            onUsernameChange={(value) => {
              viewModel.setUsername(value);
            }}
            onPasswordChange={(value) => {
              viewModel.setPassword(value);
            }}
            onTogglePasswordVisibility={() => {
              viewModel.togglePasswordVisibility();
            }}
            onSubmit={() => {
              void viewModel.submit();
            }}
          />
        </AppCard>
      </View>
    </ScreenContainer>
  );
}
