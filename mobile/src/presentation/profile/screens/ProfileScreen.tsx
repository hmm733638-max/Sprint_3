import { Text, View } from 'react-native';

import { UserSession } from '../../../domain/entities/UserSession';
import { UserRole } from '../../../domain/enums/UserRole';

import { AppButton } from '../../../shared/components/AppButton';
import { AppCard } from '../../../shared/components/AppCard';
import { AppModal } from '../../../shared/components/AppModal';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

import { useViewModelState } from '../../common/hooks/useViewModelState';

import { LogoutViewModel } from '../viewmodels/LogoutViewModel';

interface ProfileScreenProps {
  readonly session: UserSession;

  readonly logoutViewModel: LogoutViewModel;

  readonly onLogoutCompleted: () => void;
}

export function ProfileScreen({ session, logoutViewModel, onLogoutCompleted }: ProfileScreenProps) {
  const theme = useAppTheme();

  const logoutState = useViewModelState(logoutViewModel);

  async function handleConfirmLogout() {
    await logoutViewModel.confirmLogout();

    if (logoutViewModel.getState().status === 'success') {
      onLogoutCompleted();

      logoutViewModel.reset();
    }
  }

  const fullName = `${session.user.firstName} ${session.user.lastName}`.trim();

  const initials = getInitials(session.user.firstName, session.user.lastName);

  const roleLabel = getRoleLabel(session.role);

  const accessLabel = getAccessLabel(session.role);

  return (
    <ScreenContainer
      scrollable
      contentStyle={{
        gap: theme.spacing.xl,
      }}
    >
      <View
        style={{
          gap: theme.spacing.xs,
        }}
      >
        <Text
          style={{
            color: theme.colors.textSecondary,

            fontSize: theme.typography.fontSize.sm,

            fontWeight: theme.typography.fontWeight.semibold,

            letterSpacing: 1.6,

            textTransform: 'uppercase',
          }}
        >
          Tu cuenta
        </Text>

        <Text
          accessibilityRole="header"
          style={{
            color: theme.colors.textPrimary,

            fontSize: theme.typography.fontSize.display,

            lineHeight: theme.typography.lineHeight.display,

            fontWeight: theme.typography.fontWeight.bold,
          }}
        >
          Mi perfil
        </Text>

        <Text
          style={{
            color: theme.colors.textSecondary,

            fontSize: theme.typography.fontSize.md,

            lineHeight: theme.typography.lineHeight.md,
          }}
        >
          Un espacio para tu información y tu sesión.
        </Text>
      </View>

      <AppCard
        variant="outlined"
        style={{
          padding: theme.spacing.xl,

          gap: theme.spacing.xl,

          borderRadius: theme.radii.xl,
        }}
      >
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'flex-start',

            gap: theme.spacing.md,
          }}
        >
          <View
            style={{
              width: 72,
              height: 72,

              borderRadius: theme.radii.lg,

              alignItems: 'center',

              justifyContent: 'center',

              backgroundColor: theme.colors.brandPrimary,
            }}
          >
            <Text
              style={{
                color: theme.colors.textInverse,

                fontSize: theme.typography.fontSize.xxl,

                fontWeight: theme.typography.fontWeight.bold,
              }}
            >
              {initials}
            </Text>
          </View>

          <View
            style={{
              flex: 1,

              gap: theme.spacing.sm,
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
              {fullName}
            </Text>

            <View
              style={{
                alignSelf: 'flex-start',

                paddingHorizontal: theme.spacing.md,

                paddingVertical: 6,

                borderRadius: theme.radii.pill,

                backgroundColor: theme.colors.brandAccentSoft,
              }}
            >
              <Text
                style={{
                  color: theme.colors.brandPrimary,

                  fontSize: theme.typography.fontSize.sm,

                  fontWeight: theme.typography.fontWeight.semibold,
                }}
              >
                {roleLabel}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            gap: theme.spacing.lg,
          }}
        >
          <ProfileField label="Nombre de usuario" value={session.user.username} />

          <ProfileField label="Correo electrónico" value={session.user.email} />

          <ProfileField label="Teléfono" value={session.user.phone} />

          <ProfileField label="Acceso" value={accessLabel} />
        </View>
      </AppCard>

      {session.role === UserRole.CLIENT ? (
        <AppCard
          variant="outlined"
          style={{
            padding: theme.spacing.lg,

            borderRadius: theme.radii.xl,
          }}
        >
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',

              justifyContent: 'space-between',

              gap: theme.spacing.md,
            }}
          >
            <View
              style={{
                flex: 1,

                gap: 4,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textPrimary,

                  fontSize: theme.typography.fontSize.xl,

                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                Tus artículos te esperan
              </Text>

              <Text
                style={{
                  color: theme.colors.textSecondary,

                  fontSize: theme.typography.fontSize.md,

                  lineHeight: theme.typography.lineHeight.md,
                }}
              >
                Tu carrito estará disponible cuando se integre US09 y US10.
              </Text>
            </View>

            <View
              style={{
                minWidth: 92,
              }}
            >
              <AppButton title="Abrir" variant="secondary" disabled onPress={() => {}} />
            </View>
          </View>
        </AppCard>
      ) : null}

      {logoutState.status === 'error' ? (
        <Text
          accessibilityRole="alert"
          style={{
            color: theme.colors.danger,

            fontSize: theme.typography.fontSize.sm,

            lineHeight: theme.typography.lineHeight.sm,
          }}
        >
          {logoutState.errorMessage}
        </Text>
      ) : null}

      <View
        style={{
          alignSelf: 'flex-start',

          width: 220,
        }}
      >
        <AppButton
          title="Cerrar sesión"
          variant="danger"
          onPress={() => {
            logoutViewModel.requestLogout();
          }}
        />
      </View>

      <AppModal
        visible={logoutState.status === 'confirming' || logoutState.status === 'loading'}
        title="Cerrar sesión"
        description="¿Seguro que quieres cerrar tu sesión en Changarrito?"
        onRequestClose={() => {
          if (logoutState.status !== 'loading') {
            logoutViewModel.cancelLogout();
          }
        }}
        actions={
          <>
            <AppButton
              title="Cancelar"
              variant="secondary"
              disabled={logoutState.status === 'loading'}
              onPress={() => {
                logoutViewModel.cancelLogout();
              }}
            />

            <AppButton
              title="Cerrar sesión"
              variant="danger"
              loading={logoutState.status === 'loading'}
              onPress={() => {
                void handleConfirmLogout();
              }}
            />
          </>
        }
      />
    </ScreenContainer>
  );
}

interface ProfileFieldProps {
  readonly label: string;

  readonly value: string;
}

function ProfileField({ label, value }: ProfileFieldProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        gap: 6,
      }}
    >
      <Text
        style={{
          color: theme.colors.textSecondary,

          fontSize: theme.typography.fontSize.sm,

          lineHeight: theme.typography.lineHeight.sm,
        }}
      >
        {label}
      </Text>

      <Text
        style={{
          color: theme.colors.textPrimary,

          fontSize: theme.typography.fontSize.lg,

          lineHeight: theme.typography.lineHeight.lg,

          fontWeight: theme.typography.fontWeight.medium,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function getInitials(firstName: string, lastName: string): string {
  const firstInitial = firstName.trim().charAt(0);

  const lastInitial = lastName.trim().charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

function getRoleLabel(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return 'Administrador';

    case UserRole.AUDITOR:
      return 'Auditor';

    case UserRole.CLIENT:
      return 'Cliente';
  }
}

function getAccessLabel(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return 'Catálogo y gestión administrativa';

    case UserRole.AUDITOR:
      return 'Catálogo, usuarios y auditoría';

    case UserRole.CLIENT:
      return 'Catálogo y carrito personal';
  }
}
