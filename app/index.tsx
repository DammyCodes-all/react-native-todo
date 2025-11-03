import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";
import "@/globals.css";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";
  const handleToggle = () => {
    // You can use either:
    setColorScheme(isDark ? "light" : "dark");
    // or:
    toggleColorScheme();
  };
  return (
    <SafeAreaView>
      <View className="flex items-center text-red-600 justify-center">
        <Text className="text-red-600">
          Edit app/index.tsx to edit this screen.
        </Text>
      </View>
    </SafeAreaView>
  );
}
