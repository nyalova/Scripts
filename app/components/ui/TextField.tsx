import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, fontFamily, radius, spacing } from '../../constants/theme';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string | null;
}

export function TextField({ label, error, style, ...inputProps }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={colors.secondaryText}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.dark,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  error: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: '#DC2626',
    marginTop: spacing.xs,
  },
});
