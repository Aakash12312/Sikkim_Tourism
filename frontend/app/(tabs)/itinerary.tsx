// app/itinerary-planner.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Share,
} from "react-native";
import Markdown from "react-native-markdown-display";
import * as Clipboard from "expo-clipboard";

export default function ItineraryPlanner() {
    const [days, setDays] = useState("");
    const [people, setPeople] = useState("");
    const [budget, setBudget] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const generateItinerary = async () => {
        if (!days || !people || !budget) {
            Alert.alert("Please fill all fields");
            return;
        }

        setLoading(true);
        setResult("");

        try {
            console.log("Sending request with:", { days, people, budget });
            const res = await fetch("http://192.168.1.7:5000/itinerary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ days, people, budget }),
            });
            const data = await res.json();
            setResult(data.result);
        } catch (error) {
            console.warn("Error generating itinerary:", error);
            setResult("Failed to generate itinerary. Please try again.");
        }

        setLoading(false);
    };

    const copyToClipboard = async () => {
        if (!result) return;
        await Clipboard.setStringAsync(result);
        Alert.alert("Copied to clipboard!");
    };

    const shareItinerary = async () => {
        if (!result) return;
        try {
            await Share.share({ message: result });
        } catch (error) {
            console.warn("Error sharing:", error);
            Alert.alert("Failed to share itinerary.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Itinerary Planner</Text>

            <TextInput
                placeholder="Number of days"
                keyboardType="numeric"
                value={days}
                onChangeText={setDays}
                style={styles.input}
            />
            <TextInput
                placeholder="Number of people"
                keyboardType="numeric"
                value={people}
                onChangeText={setPeople}
                style={styles.input}
            />
            <TextInput
                placeholder="Budget (₹)"
                keyboardType="numeric"
                value={budget}
                onChangeText={setBudget}
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={generateItinerary}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Generate</Text>}
            </TouchableOpacity>

            {result ? (
                <View style={styles.resultContainer}>
                    <Markdown style={markdownStyles}>{result}</Markdown>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton} onPress={copyToClipboard}>
                            <Text style={styles.actionText}>Copy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton} onPress={shareItinerary}>
                            <Text style={styles.actionText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 16, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#2e8b57",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    resultContainer: { marginTop: 10, paddingBottom: 40 },
    actionButtons: { flexDirection: "row", justifyContent: "space-around", marginTop: 12 },
    actionButton: { backgroundColor: "#24a0ee", padding: 10, borderRadius: 8, minWidth: 100, alignItems: "center" },
    actionText: { color: "#fff", fontWeight: "bold" },
});

const markdownStyles = {
    body: { fontSize: 16, lineHeight: 24 },
    heading1: { fontSize: 20, fontWeight: "700" as const, marginVertical: 6 },
    heading2: { fontSize: 18, fontWeight: "600" as const, marginVertical: 4 },
    list_item: { marginVertical: 2 },
};
