import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SCREENS from '../constants/screens';

const Stack = createStackNavigator();

const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        }}>
        {React.Children.toArray(
          SCREENS.map((screen) => {
            return (
              <Stack.Screen
                name={screen.screenName}
                component={screen.component}
                options={{title: screen.text}}
              />
            );
          }),
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
