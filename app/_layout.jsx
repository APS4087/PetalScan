import * as React from 'react';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { AuthProvider } from '../context/authContext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Roboto": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("../assets/fonts/Roboto-Italic.ttf"),
    "Roboto-BoldItalic": require("../assets/fonts/Roboto-BoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}