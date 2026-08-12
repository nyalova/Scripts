import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../components/ui/Button';
import { colors, fontFamily, spacing } from '../constants/theme';
import { useAuth } from '../lib/auth-context';
import type { Role } from '../types/database';

export default function RoleSelectScreen() {
  const { setRole } = useAuth();
  const [loadingRole, setLoadingRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSelect(role: Role) {
    setError(null);
    setLoadingRole(role);
    const { error: setRoleError } = await setRole(role);
    setLoadingRole(null);

    if (setRoleError) {
      setError(setRoleError);
      return;
    }

    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sen kimsin?</Text>
      <Text style={styles.subtitle}>Bu seçimi daha sonra değiştiremezsin.</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttons}>
        <Button
          label="Startup'ım"
          onPress={() => handleSelect('startup')}
          loading={loadingRole === 'startup'}
          disabled={loadingRole !== null && loadingRole !== 'startup'}
        />
        <View style={{ height: spacing.md }} />
        <Button
          label="Investor'ım"
          onPress={() => handleSelect('investor')}
          loading={loadingRole === 'investor'}
          disabled={loadingRole !== null && loadingRole !== 'investor'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.secondaryText,
    marginBottom: spacing.lg,
  },
  error: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: '#DC2626',
    marginBottom: spacing.md,
  },
  buttons: {
    marginTop: spacing.md,
  },
});
