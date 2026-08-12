import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';
import { colors } from '../constants/theme';
import { useAuth } from '../lib/auth-context';

export default function Index() {
  const { session, role, hasCompletedProfile, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  if (!role) {
    return <Redirect href="/role-select" />;
  }

  if (!hasCompletedProfile) {
    return (
      <Redirect href={role === 'startup' ? '/create-startup-profile' : '/create-investor-profile'} />
    );
  }

  return <Redirect href="/discover" />;
}
