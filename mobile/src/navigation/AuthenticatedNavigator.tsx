import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserSession } from '../domain/entities/UserSession';
import { UserRole } from '../domain/enums/UserRole';
import { CreateProductViewModel } from '../presentation/inventory/viewmodels/CreateProductViewModel';
import { DeleteProductViewModel } from '../presentation/inventory/viewmodels/DeleteProductViewModel';
import { EditProductViewModel } from '../presentation/inventory/viewmodels/EditProductViewModel';
import { ProductDetailScreen } from '../presentation/products/screens/ProductDetailScreen';
import { CatalogViewModel } from '../presentation/products/viewmodels/CatalogViewModel';
import { ProductDetailViewModel } from '../presentation/products/viewmodels/ProductDetailViewModel';
import { LogoutViewModel } from '../presentation/profile/viewmodels/LogoutViewModel';
import { AdminNavigator } from './AdminNavigator';
import { AuditorNavigator } from './AuditorNavigator';
import { ClientNavigator } from './ClientNavigator';
import { AuthenticatedStackParamList } from './NavigationTypes';

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

interface AuthenticatedNavigatorProps {
  readonly session: UserSession;
  readonly logoutViewModel: LogoutViewModel;
  readonly catalogViewModel: CatalogViewModel;
  readonly productDetailViewModel: ProductDetailViewModel;
  readonly createProductViewModel: CreateProductViewModel;
  readonly editProductViewModel: EditProductViewModel;
  readonly deleteProductViewModel: DeleteProductViewModel;
  readonly onLogoutCompleted: () => void;
}

export function AuthenticatedNavigator({
  session,
  logoutViewModel,
  catalogViewModel,
  productDetailViewModel,
  createProductViewModel,
  editProductViewModel,
  deleteProductViewModel,
  onLogoutCompleted,
}: AuthenticatedNavigatorProps) {
  return (
    <Stack.Navigator initialRouteName="RoleTabs" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoleTabs">
        {({ navigation }) => {
          const onProductPress = (productId: number) => {
            navigation.navigate('ProductDetail', { productId });
          };

          switch (session.role) {
            case UserRole.ADMIN:
              return (
                <AdminNavigator
                  session={session}
                  logoutViewModel={logoutViewModel}
                  catalogViewModel={catalogViewModel}
                  createProductViewModel={createProductViewModel}
                  onProductPress={onProductPress}
                  onLogoutCompleted={onLogoutCompleted}
                />
              );
            case UserRole.AUDITOR:
              return (
                <AuditorNavigator
                  session={session}
                  logoutViewModel={logoutViewModel}
                  catalogViewModel={catalogViewModel}
                  onProductPress={onProductPress}
                  onLogoutCompleted={onLogoutCompleted}
                />
              );
            case UserRole.CLIENT:
              return (
                <ClientNavigator
                  session={session}
                  logoutViewModel={logoutViewModel}
                  catalogViewModel={catalogViewModel}
                  onProductPress={onProductPress}
                  onLogoutCompleted={onLogoutCompleted}
                />
              );
          }
        }}
      </Stack.Screen>

      <Stack.Screen name="ProductDetail" options={{ animation: 'slide_from_right' }}>
        {({ route, navigation }) => (
          <ProductDetailScreen
            productId={route.params.productId}
            viewModel={productDetailViewModel}
            editProductViewModel={editProductViewModel}
            deleteProductViewModel={deleteProductViewModel}
            canAddToCart={session.role === UserRole.CLIENT}
            canManageProduct={session.role === UserRole.ADMIN}
            onBack={() => navigation.goBack()}
            onDeleted={() => navigation.goBack()}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
