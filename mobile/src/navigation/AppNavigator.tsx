import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthPresentationDependencies } from '../app/composition/AuthPresentationDependencies';
import { ProductPresentationDependencies } from '../app/composition/ProductPresentationDependencies';
import { LoginScreen } from '../presentation/auth/screens/LoginScreen';
import { useViewModelState } from '../presentation/common/hooks/useViewModelState';
import { SessionLoadingScreen } from '../presentation/session/screens/SessionLoadingScreen';
import { useAppTheme } from '../shared/theme/useAppTheme';
import { AuthenticatedNavigator } from './AuthenticatedNavigator';
import { createNavigationTheme } from './createNavigationTheme';
import { RootStackParamList } from './NavigationTypes';


import { UsersViewModel } from '../presentation/users/viewmodels/UsersViewModel';const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  readonly auth: AuthPresentationDependencies;
  readonly products: ProductPresentationDependencies;

  readonly usersViewModel: UsersViewModel;
}

export function AppNavigator({ auth, products, usersViewModel }: AppNavigatorProps) {
  const theme = useAppTheme();
  const navigationTheme = createNavigationTheme(theme);
  const sessionState = useViewModelState(auth.sessionViewModel);

  useEffect(() => {
    void auth.sessionViewModel.restore();
  }, [auth.sessionViewModel]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {sessionState.status === 'checking' ? (
          <Stack.Screen name="SessionLoading" component={SessionLoadingScreen} />
        ) : null}

        {sessionState.status === 'unauthenticated' ? (
          <Stack.Screen name="Login">
            {() => (
              <LoginScreen
                viewModel={auth.loginViewModel}
                onAuthenticated={(session) => auth.sessionViewModel.setAuthenticated(session)}
              />
            )}
          </Stack.Screen>
        ) : null}

        {sessionState.status === 'authenticated' ? (
          <Stack.Screen name="Authenticated">
            {() => (
              <AuthenticatedNavigator
                session={sessionState.session}
                logoutViewModel={auth.logoutViewModel}
                catalogViewModel={products.catalogViewModel}
                productDetailViewModel={products.productDetailViewModel}
                createProductViewModel={products.createProductViewModel}
                editProductViewModel={products.editProductViewModel}
                deleteProductViewModel={products.deleteProductViewModel}
                usersViewModel={usersViewModel}
                onLogoutCompleted={() => auth.sessionViewModel.clearSession()}
              />
            )}
          </Stack.Screen>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
