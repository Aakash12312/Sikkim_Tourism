import React, { useState, useRef } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Modal,
    StyleSheet,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    PanResponder,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ChatBotButton() {
    const [visible, setVisible] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalHeight, setModalHeight] = useState(SCREEN_HEIGHT * 0.5);

    const pan = useRef({ y: 0 }).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                let newHeight = modalHeight - gestureState.dy;
                newHeight = Math.max(Math.min(newHeight, SCREEN_HEIGHT * 0.9), SCREEN_HEIGHT * 0.3);
                setModalHeight(newHeight);
            },
            onPanResponderRelease: (_, gestureState) => {
                pan.y = 0;
            },
        })
    ).current;

    const sendMessage = async () => {
        if (input.trim() === "") return;

        setMessages((prev) => [...prev, `You: ${input}`]);
        setLoading(true);

        try {
            const res = await fetch("http://192.168.1.8:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await res.json();
            setMessages((prev) => [...prev, `Bot: ${data.response}`]);
        } catch (error) {
            console.warn("Error contacting chatbot:", error);
            setMessages((prev) => [...prev, "Bot: Sorry, something went wrong."]);
        }

        setInput("");
        setLoading(false);
    };

    return (
        <>
            <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                <Ionicons name="chatbubble-ellipses" size={28} color="#fff" />
            </TouchableOpacity>

            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={styles.modalOverlay}
                >
                    <View style={[styles.modalContainer, { height: modalHeight }]}>
                        {/* Drag handle */}
                        <View
                            {...panResponder.panHandlers}
                            style={styles.dragHandle}
                        />

                        <Text style={styles.modalTitle}>Tourism Chat Bot</Text>

                        <ScrollView
                            style={styles.messagesContainer}
                            contentContainerStyle={{ paddingBottom: 8 }}
                        >
                            {messages.map((msg, idx) => (
                                <Text key={idx} style={styles.messageText}>
                                    {msg}
                                </Text>
                            ))}
                            {loading && <Text style={styles.messageText}>Bot: Typing...</Text>}
                        </ScrollView>

                        <View style={styles.inputContainer}>
                            <TextInput
                                value={input}
                                onChangeText={setInput}
                                placeholder="Ask about Sikkim tourism..."
                                style={styles.input}
                                editable={!loading}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity
                                onPress={sendMessage}
                                style={[styles.sendButton, loading && { opacity: 0.6 }]}
                                disabled={loading}
                            >
                                <Text style={{ color: "#fff" }}>Send</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={{ color: "#fff" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 100,
        right: 20,
        backgroundColor: "#24a0eeff",
        padding: 14,
        borderRadius: 30,
        zIndex: 1000,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
    },
    dragHandle: {
        width: 60,
        height: 6,
        backgroundColor: "#ccc",
        borderRadius: 3,
        alignSelf: "center",
        marginBottom: 8,
    },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
    messagesContainer: { flex: 1 },
    messageText: { marginVertical: 4 },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 8,
    },
    sendButton: {
        marginLeft: 8,
        backgroundColor: "#2e8b57",
        padding: 10,
        borderRadius: 8,
    },
    closeButton: {
        alignSelf: "center",
        marginTop: 8,
        padding: 8,
        backgroundColor: "#2e8b57",
        borderRadius: 8,
    },
});
