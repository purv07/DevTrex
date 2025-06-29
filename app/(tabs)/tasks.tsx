import { View, Text, StyleSheet } from 'react-native';

export default function Tasks() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Management</Text>
      <Text style={styles.subtitle}>Organize and track your team's development tasks</Text>
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