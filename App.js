import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './src/Screen/Index';

import AppNavigator from './src/Navigation/AppNavigator';
import Login from './src/Screen/Login';
import SignUp from './src/Screen/SignUp';
import ForgotPassword from './src/Screen/ForgotPassword';
import { auth } from './src/Screen/firebase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Check user authentication status (assuming Firebase auth)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsSignedIn(!!user); // Set isSignedIn to true if user is authenticated
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {isSignedIn ? (
          // If user is signed in, show the main app navigator
          <AppNavigator />
        ) : (
          // If not signed in, restrict access to login-related screens only
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
