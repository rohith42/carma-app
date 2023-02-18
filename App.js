import { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { COLORS } from './styles/Colors';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AppContext, { AppContextProvider } from './store/AppContext';

const Stack = createNativeStackNavigator();
// Stack to authenticate users (login/signup)
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen}
        options={{ title:'Log in' }}
      />
      <Stack.Screen 
        name="SignupScreen" 
        component={SignupScreen}
        options={{ title:'Sign up' }} 
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
// Stack for autheticated users
function AuthenticatedStack() {
  return (
    <Tab.Navigator>
    </Tab.Navigator>
  );
}

function Navigation() {
  const { cookie } = useContext(AppContext);

  return (
    <NavigationContainer>
      {!cookie && <AuthStack/>}
      {!!cookie && <AuthenticatedStack/>}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <PaperProvider theme={theme}>
        <AppContextProvider>
          <Navigation />
        </AppContextProvider>
      </PaperProvider>
    </>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    primary: COLORS.green,
    onPrimary: COLORS.white
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
