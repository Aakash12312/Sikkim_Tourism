import { Drawer } from "expo-router/drawer";
import { usePathname } from "expo-router";
import ChatBotButton from "../../components/ChatBotButton";
import { Ionicons } from "@expo/vector-icons";
export default function DrawerLayout() {
  return (
    <>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: "#2e8b57",
          drawerType: "slide",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="explore"
          options={{
            title: "Explore",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="compass-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            title: "About",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="information-circle-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="panorama"
          options={{
            title: "Panorama",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="planet-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="itinerary"
          options={{
            title: "Itinerary",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="cultural_calendar"
          options={{
            title: "Cultural Calendar",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
      <ChatBotButtonWrapper />
    </>
  );
}
// ✅ Keep your chatbot button logic intact
function ChatBotButtonWrapper() {
  const pathname = usePathname();

  // Hide chatbot ONLY on panorama (or other conditions)
  if (pathname.includes("panorama")) return null;

  return <ChatBotButton />;
}
