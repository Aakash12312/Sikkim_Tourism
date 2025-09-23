import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { places } from "./data/placesData";

export default function PlacePage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const place = id ? places[id.toLowerCase()] : null;

    if (!place) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Place not found</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{place.title}</Text>
            <Text style={styles.text}>{place.text}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
    text: { fontSize: 16, lineHeight: 22 },
});
