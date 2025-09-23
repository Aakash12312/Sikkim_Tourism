import { View, Text, StyleSheet } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.text}>
        This app showcases famous places in Sikkim and allows users to explore the beauty of the region.
      </Text>
      <Text style={styles.text}>
        Built with React Native, Expo, and Expo Router for smooth navigation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'flex-start' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  text: { fontSize: 16, marginVertical: 6 },
});
