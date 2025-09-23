import { View, Text, StyleSheet } from 'react-native';

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Sikkim</Text>
      <Text style={styles.place}>🚶‍♂️ Trekking in Yumthang Valley</Text>
      <Text style={styles.place}>🏞️ Gurudongmar Lake</Text>
      <Text style={styles.place}>🌄 Sunrise at Tsongmo Lake</Text>
      <Text style={styles.place}>🏰 Pemayangtse Monastery</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'flex-start' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  place: { fontSize: 18, marginVertical: 4 },
});
