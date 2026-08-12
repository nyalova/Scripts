import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { colors, fontFamily, spacing } from '../../constants/theme';
import { useAuth } from '../../lib/auth-context';

export default function ProfileScreen() {
  const { role, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Rol: {role === 'startup' ? 'Startup' : 'Investor'}
      </Text>
      <Text style={styles.subtext}>Profil görüntüleme/düzenleme — Phase 3&apos;te gelecek.</Text>
      <View style={styles.signOut}>
        <Button label="Çıkış Yap" variant="secondary" onPress={signOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  subtext: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.secondaryText,
    marginBottom: spacing.lg,
  },
  signOut: {
    width: '100%',
  },
});
