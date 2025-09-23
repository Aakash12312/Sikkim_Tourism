import { Slot, usePathname } from "expo-router";
import ChatBotButton from "../components/ChatBotButton";

export default function RootLayout() {
  const pathname = usePathname();

  // Hide chatbot only on panorama
  const hideChatBot = pathname.includes("panorama");

  return (
    <>
      {/* Slot will render TabsLayout or any other page (like /places/*) */}
      <Slot />

      {/* Chatbot visible everywhere except panorama */}
      {!hideChatBot && <ChatBotButton />}
    </>
  );
}
