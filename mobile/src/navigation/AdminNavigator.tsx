import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserSession } from '../domain/entities/UserSession';
import { FeaturePlaceholderScreen } from '../presentation/common/screens/FeaturePlaceholderScreen';
import { CreateProductScreen } from '../presentation/inventory/screens/CreateProductScreen';
import { CreateProductViewModel } from '../presentation/inventory/viewmodels/CreateProductViewModel';
import { CatalogScreen } from '../presentation/products/screens/CatalogScreen';
import { CatalogViewModel } from '../presentation/products/viewmodels/CatalogViewModel';
import { ProfileScreen } from '../presentation/profile/screens/ProfileScreen';
import { LogoutViewModel } from '../presentation/profile/viewmodels/LogoutViewModel';
import { useAppTheme } from '../shared/theme/useAppTheme';
import { AdminTabParamList } from './NavigationTypes';

const Tab = createBottomTabNavigator<AdminTabParamList>();

interface AdminNavigatorProps {
  readonly session: UserSession;
  readonly logoutViewModel: LogoutViewModel;
  readonly catalogViewModel: CatalogViewModel;
  readonly createProductViewModel: CreateProductViewModel;
  readonly onProductPress: (productId: number) => void;
  readonly onLogoutCompleted: () => void;
}

export function AdminNavigator({
  session,
  logoutViewModel,
  catalogViewModel,
  createProductViewModel,
  onProductPress,
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" color={color} size={size} />
          ),
        }}
      >
        {() => <CatalogScreen viewModel={catalogViewModel} onProductPress={onProductPress} />}
      </Tab.Screen>

      <Tab.Screen
        name="AdminAddProduct"
        options={{
          title: 'Agregar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      >
        {() => <CreateProductScreen viewModel={createProductViewModel} />}
      </Tab.Screen>

      <Tab.Screen
        name="AdminInventory"
        options={{
          title: 'Inventario',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <FeaturePlaceholderScreen
            title="Inventario"
            description="Aquí el administrador podrá gestionar productos en formato de lista."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="AdminUsers"
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
            description="Aquí se mostrará la administración de usuarios."
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="AdminAuditCart"
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
        name="AdminProfile"
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
