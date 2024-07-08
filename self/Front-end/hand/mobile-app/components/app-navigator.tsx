import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AppsList } from "./pages/app-list"
import { HandControlApp } from './pages/hand-control-app'

import { Content } from "./style-constants"

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AppsList"
        screenOptions={{
          headerStyle: {
            backgroundColor: Content,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            marginLeft: 16,
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen name="AppsList" component={AppsList} />
        <Stack.Screen name="HandControlApp" component={HandControlApp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
