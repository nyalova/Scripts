import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '../components/ui/Button';
import { TextField } from '../components/ui/TextField';
import { colors, fontFamily, spacing } from '../constants/theme';
import { mapAuthError } from '../lib/auth-errors';
import { supabase } from '../lib/supabase';

export default function VerifyScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  async function handleVerify() {
    setError(null);

    if (code.trim().length !== 6) {
      setError('6 haneli kodu eksiksiz girin.');
      return;
    }

    setLoading(true);
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code.trim(),
        type: 'email',
      });

      if (verifyError) {
        setError(mapAuthError(verifyError.message));
        return;
      }

      router.replace('/');
    } catch (err) {
      setError(mapAuthError(err instanceof Error ? err.message : undefined));
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError(null);
    setResendMessage(null);
    setResending(true);
    try {
      const { error: resendError } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });

      if (resendError) {
        setError(mapAuthError(resendError.message));
        return;
      }

      setResendMessage('Yeni kod gönderildi.');
    } catch (err) {
      setError(mapAuthError(err instanceof Error ? err.message : undefined));
    } finally {
      setResending(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Kodu Gir</Text>
        <Text style={styles.subtitle}>{email} adresine gönderilen 6 haneli kodu gir.</Text>

        <TextField
          label="Kod"
          placeholder="123456"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
          error={error}
        />

        {resendMessage ? <Text style={styles.success}>{resendMessage}</Text> : null}

        <Button label="Devam Et" onPress={handleVerify} loading={loading} />

        <Pressable onPress={handleResend} disabled={resending} style={styles.resend}>
          <Text style={styles.resendLabel}>
            {resending ? 'Gönderiliyor...' : 'Kodu tekrar gönder'}
          </Text>
        </Pressable>
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
  success: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.success,
    marginBottom: spacing.md,
  },
  resend: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  resendLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.primary,
  },
});
