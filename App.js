import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InputScreen from './screens/InputScreen';
import OutputScreen from './screens/OutputScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="InputScreen" 
          component={InputScreen}
          options={{
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="OutputScreen" 
          component={OutputScreen}
          options={{
            headerShown: false 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
