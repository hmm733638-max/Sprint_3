import { Pressable, Text, View } from 'react-native';

import { LoginUiState } from '../state/LoginUiState';

import { AppButton } from '../../../shared/components/AppButton';
import { AppInput } from '../../../shared/components/AppInput';
import { InfoBanner } from '../../../shared/components/InfoBanner';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

interface LoginFormProps {
  readonly state: LoginUiState;

  readonly onUsernameChange: (value: string) => void;

  readonly onPasswordChange: (value: string) => void;

  readonly onTogglePasswordVisibility: () => void;

  readonly onSubmit: () => void;
}

export function LoginForm({
  state,
  onUsernameChange,
  onPasswordChange,
  onTogglePasswordVisibility,
  onSubmit,
}: LoginFormProps) {
  const theme = useAppTheme();

  const isLoading = state.status === 'loading';

  return (
    <View
      style={{
        width: '100%',
        gap: theme.spacing.lg,
      }}
    >
      {state.errorMessage ? (
        <InfoBanner
          message={state.errorMessage}
          tone={state.status === 'unavailable' ? 'warning' : 'danger'}
        />
      ) : null}

      <AppInput
        label="Usuario"
        placeholder="Escribe tu usuario"
        value={state.username}
        onChangeText={onUsernameChange}
        errorMessage={state.usernameError ?? undefined}
        editable={!isLoading}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username"
        textContentType="username"
        returnKeyType="next"
      />

      <AppInput
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        value={state.password}
        onChangeText={onPasswordChange}
        errorMessage={state.passwordError ?? undefined}
        editable={!isLoading}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="current-password"
        textContentType="password"
        secureTextEntry={!state.passwordVisible}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        rightAccessory={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={state.passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            disabled={isLoading}
            onPress={onTogglePasswordVisibility}
            hitSlop={8}
          >
            <Text
              style={{
                color: theme.colors.brandAccent,

                fontSize: theme.typography.fontSize.sm,

                fontWeight: theme.typography.fontWeight.semibold,
              }}
            >
              {state.passwordVisible ? 'Ocultar' : 'Mostrar'}
            </Text>
          </Pressable>
        }
      />

      <AppButton
        title="Iniciar sesión"
        onPress={onSubmit}
        loading={isLoading}
        disabled={isLoading}
        accessibilityLabel="Iniciar sesión"
      />
    </View>
  );
}
