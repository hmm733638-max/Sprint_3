import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BootstrapScreen } from '../presentation/bootstrap/screens/BootstrapScreen';
import { useAppTheme } from '../shared/theme/useAppTheme';

import { createNavigationTheme } from './createNavigationTheme';
import { RootStackParamList } from './NavigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const theme = useAppTheme();

  const navigationTheme = createNavigationTheme(theme);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Bootstrap"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Bootstrap" component={BootstrapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
