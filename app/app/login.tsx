import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../components/ui/Button';
import { TextField } from '../components/ui/TextField';
import { colors, fontFamily, spacing } from '../constants/theme';
import { isValidEmail, mapAuthError } from '../lib/auth-errors';
import { supabase } from '../lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSendCode() {
    setError(null);

    if (!isValidEmail(email)) {
      setError('Geçerli bir email adresi girin.');
      return;
    }

    setLoading(true);
    try {
      const { error: sendError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true },
      });

      if (sendError) {
        setError(mapAuthError(sendError.message));
        return;
      }

      router.push({ pathname: '/verify', params: { email: email.trim() } });
    } catch (err) {
      setError(mapAuthError(err instanceof Error ? err.message : undefined));
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Giriş Yap</Text>
        <Text style={styles.subtitle}>Email adresine 6 haneli bir kod göndereceğiz.</Text>

        <TextField
          label="Email"
          placeholder="ornek@email.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          error={error}
        />

        <Button label="Kod Gönder" onPress={handleSendCode} loading={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
});
