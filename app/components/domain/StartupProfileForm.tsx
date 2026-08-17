import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../ui/Button';
import { RadioGroup } from '../ui/RadioGroup';
import { Tag } from '../ui/Tag';
import { TextField } from '../ui/TextField';
import { AMOUNT_RANGES, SECTORS } from '../../constants/options';
import { colors, fontFamily, spacing } from '../../constants/theme';
import type { AmountRange, Sector } from '../../types/database';

export interface StartupProfileFormValues {
  name: string;
  description: string;
  sector: Sector[];
  funding_amount: AmountRange;
}

interface StartupProfileFormProps {
  title: string;
  submitLabel: string;
  initialValues?: Partial<StartupProfileFormValues>;
  onSubmit: (values: StartupProfileFormValues) => Promise<string | null>;
}

export function StartupProfileForm({
  title,
  submitLabel,
  initialValues,
  onSubmit,
}: StartupProfileFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [sector, setSector] = useState<Sector[]>(initialValues?.sector ?? []);
  const [fundingAmount, setFundingAmount] = useState<AmountRange | null>(
    initialValues?.funding_amount ?? null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function toggleSector(value: Sector) {
    setSector((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  async function handleSubmit() {
    setError(null);

    if (!name.trim() || !description.trim() || sector.length === 0 || !fundingAmount) {
      setError('Tüm alanları doldurun ve en az bir sektör seçin.');
      return;
    }

    setLoading(true);
    const submitError = await onSubmit({
      name: name.trim(),
      description: description.trim(),
      sector,
      funding_amount: fundingAmount,
    });
    setLoading(false);

    if (submitError) {
      setError(submitError);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>

      <TextField
        label="İşletmenin adı"
        placeholder="ACME AI"
        value={name}
        onChangeText={setName}
      />

      <TextField
        label="Ne yapıyorsunuz?"
        placeholder="Yapay zeka destekli satış otomasyonu geliştiriyoruz."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.multiline}
      />

      <Text style={styles.label}>Ne kadar yatırım arıyorsunuz?</Text>
      <RadioGroup options={AMOUNT_RANGES} value={fundingAmount} onChange={setFundingAmount} />

      <Text style={styles.label}>Sektör</Text>
      <View style={styles.tagRow}>
        {SECTORS.map((option) => (
          <Tag
            key={option}
            label={option}
            selected={sector.includes(option)}
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
