import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { colors } from '../constants/theme';
import { AuthProvider, useAuth } from '../lib/auth-context';

function RootNavigator() {
  const { session, role, hasCompletedProfile } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Protected guard={!session}>
        <Stack.Screen name="login" />
        <Stack.Screen name="verify" />
      </Stack.Protected>
      <Stack.Protected guard={!!session && !role}>
        <Stack.Screen name="role-select" />
      </Stack.Protected>
      <Stack.Protected guard={!!session && role === 'startup' && !hasCompletedProfile}>
        <Stack.Screen name="create-startup-profile" />
      </Stack.Protected>
      <Stack.Protected guard={!!session && role === 'investor' && !hasCompletedProfile}>
        <Stack.Screen name="create-investor-profile" />
      </Stack.Protected>
      <Stack.Protected guard={!!session && !!role && hasCompletedProfile}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="edit-startup-profile" />
        <Stack.Screen name="edit-investor-profile" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Inter_400Regular,
      Inter_500Medium,
      Inter_600SemiBold,
      Inter_700Bold,
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <AuthProvider>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar style="dark" />
        <RootNavigator />
      </View>
    </AuthProvider>
  );
}
