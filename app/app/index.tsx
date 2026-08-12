import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../constants/theme';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Startup-Investor MVP</Text>
      <Text style={styles.subtitle}>Project setup complete. Screens land in later phases.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: 'center',
  },
});
