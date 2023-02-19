import { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { COLORS } from './styles/Colors';

import InsightsIcon from './components/InsightsIcon';
import LeaderboardIcon from './components/LeaderboardIcon';
import RewardsIcon from './components/RewardsIcon';

import AppContext, { AppContextProvider } from './store/AppContext';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ChooseDomainsScreen from './screens/ChooseDomainsScreen';
import InsightsScreen from './screens/InsightsScreen';
import RewardsScreen from './screens/RewardsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';


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
      <Stack.Screen 
        name="ChooseDomainsScreen" 
        component={ChooseDomainsScreen}
        options={{ 
          title:'Select domains',
          headerBackVisible: false 
        }} 
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
// Stack for autheticated users
function AuthenticatedStack() {
  return (
    <Tab.Navigator
      screenOptions={{ 
        tabBarActiveTintColor: COLORS.green,
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 25,
        }
      }}
    >
      <Tab.Screen
        name="InsightsScreen" 
        component={InsightsScreen}
        options={{ 
          title:'Insights', 
          tabBarIcon: ({ color }) => (
            <InsightsIcon color={color}/>
          ),
        }} 
      /> 
      <Tab.Screen
        name="RewardsScreen" 
        component={RewardsScreen}
        options={{ 
          title:'Rewards',
          tabBarIcon: ({ color }) => (
            <RewardsIcon color={color}/>
          ),  
        }} 
      /> 
      <Tab.Screen
        name="LeaderboardScreen" 
        component={LeaderboardScreen}
        options={{ 
          title:'Leaderboard',
          tabBarIcon: ({ color }) => (
            <LeaderboardIcon color={color}/>
          ), 
        }} 
      /> 
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
