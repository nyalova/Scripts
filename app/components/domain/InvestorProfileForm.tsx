import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../ui/Button';
import { RadioGroup } from '../ui/RadioGroup';
import { Tag } from '../ui/Tag';
import { TextField } from '../ui/TextField';
import { AMOUNT_RANGES, SECTORS } from '../../constants/options';
import { colors, fontFamily, spacing } from '../../constants/theme';
import type { AmountRange, Sector } from '../../types/database';

export interface InvestorProfileFormValues {
  name: string;
  about: string;
  sector_interest: Sector[];
  investment_amount: AmountRange;
}

interface InvestorProfileFormProps {
  title: string;
  submitLabel: string;
  initialValues?: Partial<InvestorProfileFormValues>;
  onSubmit: (values: InvestorProfileFormValues) => Promise<string | null>;
}

export function InvestorProfileForm({
  title,
  submitLabel,
  initialValues,
  onSubmit,
}: InvestorProfileFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [about, setAbout] = useState(initialValues?.about ?? '');
  const [sectorInterest, setSectorInterest] = useState<Sector[]>(
    initialValues?.sector_interest ?? []
  );
  const [investmentAmount, setInvestmentAmount] = useState<AmountRange | null>(
    initialValues?.investment_amount ?? null
  );
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

    setLoading(true);
    const submitError = await onSubmit({
      name: name.trim(),
      about: about.trim(),
      sector_interest: sectorInterest,
      investment_amount: investmentAmount,
    });
    setLoading(false);

    if (submitError) {
      setError(submitError);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>

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

      <Button label={submitLabel} onPress={handleSubmit} loading={loading} />
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
