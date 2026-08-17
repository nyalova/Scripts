import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Tag } from '../../components/ui/Tag';
import { AMOUNT_RANGES } from '../../constants/options';
import { colors, fontFamily, spacing } from '../../constants/theme';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import type { InvestorProfile, StartupProfile } from '../../types/database';

function amountLabel(value: string) {
  return AMOUNT_RANGES.find((option) => option.value === value)?.label ?? value;
}

export default function ProfileScreen() {
  const { role, session, signOut } = useAuth();
  const [profile, setProfile] = useState<StartupProfile | InvestorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!session || !role) return;

      let cancelled = false;
      setLoading(true);

      const table = role === 'startup' ? 'startup_profiles' : 'investor_profiles';
      supabase
        .from(table)
        .select('*')
        .eq('user_id', session.user.id)
        .single()
        .then(({ data }) => {
          if (!cancelled) {
            setProfile(data);
            setLoading(false);
          }
        });

      return () => {
        cancelled = true;
      };
    }, [session, role])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const isStartup = role === 'startup';
  const startup = isStartup ? (profile as StartupProfile | null) : null;
  const investor = !isStartup ? (profile as InvestorProfile | null) : null;

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.name}>{startup?.name ?? investor?.name}</Text>

        <View style={styles.tagRow}>
          {(startup?.sector ?? investor?.sector_interest ?? []).map((s) => (
            <Tag key={s} label={s} />
          ))}
        </View>

        <Text style={styles.amount}>
          {amountLabel(startup?.funding_amount ?? investor?.investment_amount ?? '')}
        </Text>

        <Text style={styles.description}>{startup?.description ?? investor?.about}</Text>
      </Card>

      <View style={styles.actions}>
        <Button
          label="Düzenle"
          variant="secondary"
          onPress={() => router.push(isStartup ? '/edit-startup-profile' : '/edit-investor-profile')}
        />
        <View style={{ height: spacing.sm }} />
        <Button label="Çıkış Yap" variant="secondary" onPress={signOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  amount: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  actions: {
    marginTop: spacing.lg,
  },
});
