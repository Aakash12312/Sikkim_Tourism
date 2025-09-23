import { Tabs, usePathname } from "expo-router";
import ChatBotButton from "../../components/ChatBotButton";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: "#2e8b57",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="compass" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="information-circle" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="panorama"
          options={{
            title: "Panorama",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="planet" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
        name="itinerary"
        options={{
          title: "Itinerary",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      </Tabs>

      <ChatBotButtonWrapper />
    </>
  );
}

// ✅ This will now also work for /places/* because we don't exclude them
function ChatBotButtonWrapper() {
  const pathname = usePathname();

  // Hide chatbot ONLY on index ("/") and panorama
  if (pathname.includes("panorama")) return null;

  return <ChatBotButton />;
}
