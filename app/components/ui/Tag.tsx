import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontFamily, radius, spacing } from '../../constants/theme';

interface TagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Tag({ label, selected, onPress }: TagProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.base, selected && styles.selected]}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    backgroundColor: colors.white,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.dark,
  },
  selectedLabel: {
    color: colors.white,
  },
});
