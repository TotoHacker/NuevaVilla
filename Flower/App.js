import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import MainView from './viewprin';
import FormView from './question';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainView} />
        <Stack.Screen name="Formulario" component={FormView} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
