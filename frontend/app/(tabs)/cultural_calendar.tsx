import { View, Text, ScrollView, StyleSheet } from "react-native";

const culturalEvents = [
    { month: "January", event: "Losar (Tibetan New Year) - Traditional dances and rituals." },
    { month: "February", event: "Sonam Losar - Tamang New Year celebrations." },
    { month: "March", event: "Saga Dawa - Honoring Lord Buddha’s birth, enlightenment, and death." },
    { month: "May", event: "Bumchu Festival at Tashiding Monastery - Sacred water ceremony." },
    { month: "July", event: "Guru Rinpoche’s Birthday Celebrations in monasteries." },
    { month: "August", event: "Drukpa Tshechi - Sacred mask dances (Cham) performed in monasteries." },
    { month: "September", event: "Pang Lhabsol - Celebration of Mount Khangchendzonga as guardian deity." },
    { month: "October", event: "Dasain Festival - Major Hindu festival with family gatherings." },
    { month: "November", event: "Lhabab Duchen - Marks Buddha’s descent from heaven." },
    { month: "December", event: "Christmas & New Year celebrations in towns." },
];

export default function CulturalCalendar() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Cultural Calendar of Sikkim - 2025</Text>
            {culturalEvents.map((item, index) => (
                <View key={index} style={styles.eventCard}>
                    <Text style={styles.month}>{item.month}</Text>
                    <Text style={styles.event}>{item.event}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#2e8b57" },
    eventCard: {
        backgroundColor: "#f0f8f5",
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: "#2e8b57",
    },
    month: { fontSize: 18, fontWeight: "bold", color: "#333" },
    event: { fontSize: 16, color: "#555", marginTop: 5 },
});
