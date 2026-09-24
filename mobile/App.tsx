import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createApplicationComposition } from './src/app/composition/createApplicationComposition';
import { defaultAppConfig } from './src/core/config/DefaultAppConfig';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AppThemeProvider } from './src/shared/theme/AppThemeProvider';
import { defaultTheme } from './src/shared/theme/defaultTheme';

import { GetUsersUseCase } from './src/domain/usecases/users/GetUsersUseCase';
import { useUsersViewModel } from './src/presentation/users/viewmodels/UsersViewModel';
import { UserRepository } from './src/domain/repositories/UserRepository';

export default function App() {
  const [composition] = useState(() => createApplicationComposition(defaultAppConfig));

  const [getUsersUseCase] = useState(() => {
    const mockRepository = {
      getUsers: async () => [],
    } as unknown as UserRepository;

    return new GetUsersUseCase(mockRepository);
  });


  const usersViewModel = useUsersViewModel(getUsersUseCase);

  return (
    <SafeAreaProvider>
      <AppThemeProvider theme={defaultTheme}>
        <AppNavigator
          auth={composition.auth}
          products={composition.products}
          usersViewModel={usersViewModel}
        />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
