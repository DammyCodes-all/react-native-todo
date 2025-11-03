import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";
import "@/globals.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function Index() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";
  const [fontsLoaded] = useFonts({
    monofont: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <View className="w-full flex flex-col items-center gap-4 relative">
        <View className="absolute inset-0 w-full h-64 bg-black opacity-50"></View>
      </View>
    </SafeAreaView>
  );
}
