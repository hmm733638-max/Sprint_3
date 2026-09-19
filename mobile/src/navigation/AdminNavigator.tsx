import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserSession } from '../domain/entities/UserSession';

import { FeaturePlaceholderScreen } from '../presentation/common/screens/FeaturePlaceholderScreen';

import { ProfileScreen } from '../presentation/profile/screens/ProfileScreen';

import { LogoutViewModel } from '../presentation/profile/viewmodels/LogoutViewModel';

import { useAppTheme } from '../shared/theme/useAppTheme';

import { AdminTabParamList } from './NavigationTypes';

const Tab = createBottomTabNavigator<AdminTabParamList>();

interface AdminNavigatorProps {
  readonly session: UserSession;

  readonly logoutViewModel: LogoutViewModel;

  readonly onLogoutCompleted: () => void;
}

export function AdminNavigator({
  session,
  logoutViewModel,
  onLogoutCompleted,
}: AdminNavigatorProps) {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      initialRouteName="AdminCatalog"
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
        name="AdminCatalog"
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
            description="Aquí se integrará el catálogo general de productos."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="AdminInventory"
        options={{
          title: 'Inventario',

          tabBarIcon: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: 20,
              }}
            >
              📦
            </Text>
          ),
        }}
      >
        {() => (
          <FeaturePlaceholderScreen
            title="Inventario"
            description="Aquí se integrarán las funciones de crear, editar y eliminar productos de US06, US07 y US08."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="AdminProfile"
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
