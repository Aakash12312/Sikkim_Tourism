import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/places/rumtek")}>
        <Text style={styles.link}>Rumtek</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/places/enchey")}>
        <Text style={styles.link}>Enchey</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/places/pemayangtse")}>
        <Text style={styles.link}>Pemayangtse</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  link: {
    fontSize: 20,
    marginVertical: 10,
    color: "#2e8b57",
    fontWeight: "bold",
  },
});
