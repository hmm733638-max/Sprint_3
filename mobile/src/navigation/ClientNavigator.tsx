import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserSession } from '../domain/entities/UserSession';

import { FeaturePlaceholderScreen } from '../presentation/common/screens/FeaturePlaceholderScreen';

import { CatalogScreen } from '../presentation/products/screens/CatalogScreen';

import { CatalogViewModel } from '../presentation/products/viewmodels/CatalogViewModel';

import { ProfileScreen } from '../presentation/profile/screens/ProfileScreen';

import { LogoutViewModel } from '../presentation/profile/viewmodels/LogoutViewModel';

import { useAppTheme } from '../shared/theme/useAppTheme';

import { ClientTabParamList } from './NavigationTypes';

const Tab = createBottomTabNavigator<ClientTabParamList>();

interface ClientNavigatorProps {
  readonly session: UserSession;

  readonly logoutViewModel: LogoutViewModel;

  readonly catalogViewModel: CatalogViewModel;

  readonly onProductPress: (productId: number) => void;

  readonly onLogoutCompleted: () => void;
}

export function ClientNavigator({
  session,
  logoutViewModel,
  catalogViewModel,
  onProductPress,
  onLogoutCompleted,
}: ClientNavigatorProps) {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      initialRouteName="ClientCatalog"
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
        name="ClientCatalog"
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
        name="ClientCart"
        options={{
          title: 'Carrito',

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-handle-outline" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <FeaturePlaceholderScreen
            title="Mi carrito"
            description="Aquí se integrará el carrito de compras en US09 y US10."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="ClientProfile"
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
