import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserSession } from '../domain/entities/UserSession';

import { FeaturePlaceholderScreen } from '../presentation/common/screens/FeaturePlaceholderScreen';

import { CatalogScreen } from '../presentation/products/screens/CatalogScreen';

import { CatalogViewModel } from '../presentation/products/viewmodels/CatalogViewModel';

import { ProfileScreen } from '../presentation/profile/screens/ProfileScreen';

import { LogoutViewModel } from '../presentation/profile/viewmodels/LogoutViewModel';

import { useAppTheme } from '../shared/theme/useAppTheme';

import { AuditorTabParamList } from './NavigationTypes';

const Tab = createBottomTabNavigator<AuditorTabParamList>();

interface AuditorNavigatorProps {
  readonly session: UserSession;

  readonly logoutViewModel: LogoutViewModel;

  readonly catalogViewModel: CatalogViewModel;

  readonly onProductPress: (productId: number) => void;

  readonly onLogoutCompleted: () => void;
}

export function AuditorNavigator({
  session,
  logoutViewModel,
  catalogViewModel,
  onProductPress,
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

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" color={color} size={size} />
          ),
        }}
      >
        {() => <CatalogScreen viewModel={catalogViewModel} onProductPress={onProductPress} />}
      </Tab.Screen>

      <Tab.Screen
        name="AuditorUsers"
        options={{
          title: 'Usuarios',

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <FeaturePlaceholderScreen
            title="Usuarios"
            description="Aquí el auditor podrá consultar la información correspondiente de usuarios."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="AuditorCartAudit"
        options={{
          title: 'Auditoría',

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <FeaturePlaceholderScreen
            title="Auditoría"
            description="Aquí se mostrará la auditoría de carritos."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="AuditorProfile"
        options={{
          title: 'Perfil',

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
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
