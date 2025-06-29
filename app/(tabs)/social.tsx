import { View, Text, StyleSheet } from 'react-native';

export default function Social() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Feed</Text>
      <Text style={styles.subtitle}>Stay updated with team activities and achievements</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});