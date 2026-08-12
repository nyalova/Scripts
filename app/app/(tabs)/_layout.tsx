import { Tabs } from 'expo-router';
import { colors, fontFamily } from '../../constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: { borderTopColor: colors.border, backgroundColor: colors.white },
        tabBarLabelStyle: { fontFamily: fontFamily.medium, fontSize: 12 },
      }}
    >
      <Tabs.Screen name="discover" options={{ title: '🏠 Keşfet' }} />
      <Tabs.Screen name="messages" options={{ title: '💬 Mesajlar' }} />
      <Tabs.Screen name="profile" options={{ title: '👤 Profil' }} />
    </Tabs>
  );
}
