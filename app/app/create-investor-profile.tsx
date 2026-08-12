import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../components/ui/Button';
import { RadioGroup } from '../components/ui/RadioGroup';
import { Tag } from '../components/ui/Tag';
import { TextField } from '../components/ui/TextField';
import { AMOUNT_RANGES, SECTORS } from '../constants/options';
import { colors, fontFamily, spacing } from '../constants/theme';
import { useAuth } from '../lib/auth-context';
import { supabase } from '../lib/supabase';
import type { AmountRange, Sector } from '../types/database';

export default function CreateInvestorProfileScreen() {
  const { session, markProfileCompleted } = useAuth();
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [sectorInterest, setSectorInterest] = useState<Sector[]>([]);
  const [investmentAmount, setInvestmentAmount] = useState<AmountRange | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function toggleSector(value: Sector) {
    setSectorInterest((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  async function handleSubmit() {
    setError(null);

    if (!name.trim() || !about.trim() || sectorInterest.length === 0 || !investmentAmount) {
      setError('Tüm alanları doldurun ve en az bir sektör seçin.');
      return;
    }

    if (!session) {
      setError('Oturum bulunamadı, tekrar giriş yapın.');
      return;
    }

    setLoading(true);
    const { error: insertError } = await supabase.from('investor_profiles').insert({
      user_id: session.user.id,
      name: name.trim(),
      about: about.trim(),
      sector_interest: sectorInterest,
      investment_amount: investmentAmount,
    });
    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    markProfileCompleted();
    router.replace('/');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Investor Profilini Oluştur</Text>

      <TextField label="İsim" placeholder="Ahmet Yılmaz" value={name} onChangeText={setName} />

      <TextField
        label="Hakkımda"
        placeholder="Fintech ve SaaS şirketlerine yatırım yapmakla ilgileniyorum."
        value={about}
        onChangeText={setAbout}
        multiline
        numberOfLines={4}
        style={styles.multiline}
      />

      <Text style={styles.label}>Yatırım miktarım</Text>
      <RadioGroup
        options={AMOUNT_RANGES}
        value={investmentAmount}
        onChange={setInvestmentAmount}
      />

      <Text style={styles.label}>Sektör</Text>
      <View style={styles.tagRow}>
        {SECTORS.map((option) => (
          <Tag
            key={option}
            label={option}
            selected={sectorInterest.includes(option)}
            onPress={() => toggleSector(option)}
          />
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button label="Kaydet" onPress={handleSubmit} loading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.dark,
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  error: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: '#DC2626',
    marginBottom: spacing.md,
  },
});
