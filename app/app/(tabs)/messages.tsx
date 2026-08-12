import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily } from '../../constants/theme';

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mesajlar — Phase 5&apos;te gelecek.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.secondaryText,
  },
});
