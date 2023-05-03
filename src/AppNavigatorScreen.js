import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import MapScreen from './MapScreen';
import MappolylineScreen from './MappolylineScreen';
import ChatScreen from './Chats/ChatScreen';
import LoginScreen from './Chats/LoginScreen';
import RegistrationScreen from './Chats/RegistrationScreen';
import SplashScreen from './Chats/SplashScreen';

const Stack = createNativeStackNavigator();
const AppNavigatorScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />

        {/* Google Map  */}
        {/* <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="MapExpolre" component={MappolylineScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigatorScreen;

const styles = StyleSheet.create({});
