import "@/globals.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL! ||
    "https://lovable-tern-309.convex.cloud",
  {
    unsavedChangesWarning: false,
  }
);

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConvexProvider client={convex}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </ConvexProvider>
    </GestureHandlerRootView>
  );
}
