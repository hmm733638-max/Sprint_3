import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserSession } from '../domain/entities/UserSession';

import { FeaturePlaceholderScreen } from '../presentation/common/screens/FeaturePlaceholderScreen';

import { ProfileScreen } from '../presentation/profile/screens/ProfileScreen';

import { LogoutViewModel } from '../presentation/profile/viewmodels/LogoutViewModel';

import { useAppTheme } from '../shared/theme/useAppTheme';

import { AuditorTabParamList } from './NavigationTypes';

const Tab = createBottomTabNavigator<AuditorTabParamList>();

interface AuditorNavigatorProps {
  readonly session: UserSession;

  readonly logoutViewModel: LogoutViewModel;

  readonly onLogoutCompleted: () => void;
}

export function AuditorNavigator({
  session,
  logoutViewModel,
  onLogoutCompleted,
}: AuditorNavigatorProps) {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      initialRouteName="AuditorCatalog"
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: theme.colors.brandAccent,

        tabBarInactiveTintColor: theme.colors.textMuted,

        tabBarStyle: {
          minHeight: theme.sizes.bottomTab.height,

          paddingTop: theme.spacing.xs,

          paddingBottom: theme.spacing.xs,

          backgroundColor: theme.colors.surface,

          borderTopColor: theme.colors.border,
        },

        tabBarLabelStyle: {
          fontSize: theme.typography.fontSize.xs,

          fontWeight: theme.typography.fontWeight.medium,
        },
      }}
    >
      <Tab.Screen
        name="AuditorCatalog"
        options={{
          title: 'Catálogo',

          tabBarIcon: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: 20,
              }}
            >
              🏠
            </Text>
          ),
        }}
      >
        {() => (
          <FeaturePlaceholderScreen
            title="Catálogo"
            description="Aquí se integrará la consulta de productos."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="AuditorUsers"
        options={{
          title: 'Usuarios',

          tabBarIcon: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: 20,
              }}
            >
              👥
            </Text>
          ),
        }}
      >
        {() => (
          <FeaturePlaceholderScreen
            title="Usuarios"
            description="Aquí se integrará la consulta de usuarios correspondiente a las historias de auditoría."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="AuditorAudit"
        options={{
          title: 'Auditoría',

          tabBarIcon: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: 20,
              }}
            >
              📋
            </Text>
          ),
        }}
      >
        {() => (
          <FeaturePlaceholderScreen
            title="Auditoría"
            description="Aquí se integrará la auditoría de carritos."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="AuditorProfile"
        options={{
          title: 'Perfil',

          tabBarIcon: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: 20,
              }}
            >
              👤
            </Text>
          ),
        }}
      >
        {() => (
          <ProfileScreen
            session={session}
            logoutViewModel={logoutViewModel}
            onLogoutCompleted={onLogoutCompleted}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
