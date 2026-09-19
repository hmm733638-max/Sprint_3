import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserSession } from '../domain/entities/UserSession';

import { FeaturePlaceholderScreen } from '../presentation/common/screens/FeaturePlaceholderScreen';

import { ProfileScreen } from '../presentation/profile/screens/ProfileScreen';

import { LogoutViewModel } from '../presentation/profile/viewmodels/LogoutViewModel';

import { useAppTheme } from '../shared/theme/useAppTheme';

import { ClientTabParamList } from './NavigationTypes';

const Tab = createBottomTabNavigator<ClientTabParamList>();

interface ClientNavigatorProps {
  readonly session: UserSession;

  readonly logoutViewModel: LogoutViewModel;

  readonly onLogoutCompleted: () => void;
}

export function ClientNavigator({
  session,
  logoutViewModel,
  onLogoutCompleted,
}: ClientNavigatorProps) {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      initialRouteName="ClientHome"
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
        name="ClientHome"
        options={{
          title: 'Inicio',

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
            title="Inicio"
            description="Aquí se mostrará el catálogo de productos cuando se integre US03, US04 y US05."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="ClientCart"
        options={{
          title: 'Carrito',

          tabBarIcon: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: 20,
              }}
            >
              🛒
            </Text>
          ),
        }}
      >
        {() => (
          <FeaturePlaceholderScreen
            title="Mi carrito"
            description="Aquí se integrará el carrito desarrollado en US09 y US10."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="ClientProfile"
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
