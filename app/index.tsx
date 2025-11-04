import { CreateTodo } from "@/components/CreateTodo";
import { Todo } from "@/components/Todo";
import { api } from "@/convex/_generated/api";
import "@/globals.css";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const todos = useQuery(api.todos.getTodos);
  const clearCompleted = useMutation(api.todos.clearCompleted);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [fontsLoaded] = useFonts({
    monofont: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  type TodoDoc = NonNullable<typeof todos>[number];
  const [orderedTodos, setOrderedTodos] = useState<TodoDoc[]>([]);

  useEffect(() => {
    if (!todos) {
      return;
    }

    setOrderedTodos((prev) => {
      if (prev.length === 0) {
        return todos;
      }

      const reordered = prev
        .map((prevTodo) => todos.find((todo) => todo._id === prevTodo._id))
        .filter((todo): todo is TodoDoc => Boolean(todo));

      const existingIds = new Set(reordered.map((todo) => todo._id));
      const newTodos = todos.filter((todo) => !existingIds.has(todo._id));

      return [...reordered, ...newTodos];
    });
  }, [todos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return orderedTodos.filter((todo) => !todo.completed);
      case "completed":
        return orderedTodos.filter((todo) => todo.completed);
      default:
        return orderedTodos;
    }
  }, [filter, orderedTodos]);

  const hasCompleted = useMemo(
    () => orderedTodos.some((todo) => todo.completed),
    [orderedTodos]
  );

  const handleClearCompleted = useCallback(async () => {
    if (!hasCompleted) {
      return;
    }

    setOrderedTodos((prev) => prev.filter((todo) => !todo.completed));

    try {
      await clearCompleted();
    } catch (error) {
      console.error("Failed to clear completed todos", error);
    }
  }, [clearCompleted, hasCompleted]);

  const listFooter = (
    <View className="flex-row justify-between items-center w-full px-5 py-3 text-[#9495A5] dark:text-[#5B5E7E]">
      <Text className="text-[#9495A5] dark:text-[#5B5E7E]">
        {orderedTodos.length} items
      </Text>
      <TouchableOpacity
        onPress={handleClearCompleted}
        disabled={!hasCompleted}
        className={hasCompleted ? "" : "opacity-40"}
      >
        <Text className="text-[#9495A5] dark:text-[#5B5E7E]">
          Clear completed
        </Text>
      </TouchableOpacity>
    </View>
  );

  // useEffect(() => {
  //   console.log("Todos:", todos);
  // }, [todos]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 relative bg-[#fafafa] dark:bg-[#171823]">
      <View className="absolute top-0 items-center justify-center w-full overflow-hidden h-72">
        <ImageBackground
          source={
            colorScheme === "dark"
              ? require("@/assets/images/dark.png")
              : require("@/assets/images/light.png")
          }
          resizeMode="cover"
          style={styles.heroBackground}
        />
        <LinearGradient
          colors={[
            "hsla(284, 48%, 49%, 0.65)",
            "hsla(284, 48%, 49%, 0.65)",
            "hsla(220, 100%, 45%, 0.65)",
          ]}
          locations={[0, 0.4, 1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.scrim}
        />
      </View>
      {/* Main content area */}
      <View className="flex flex-col mx-auto items-center gap-10 py-7 px-8 max-w-[600px]">
        <View className="flex-row items-center justify-between w-full">
          <Text
            style={{ fontFamily: "monofont" }}
            className=" text-white text-5xl font-bold tracking-[8px] uppercase"
          >
            TODO
          </Text>
          <TouchableOpacity onPress={() => toggleColorScheme()}>
            {colorScheme === "dark" ? (
              <Feather name="sun" size={30} color="white" />
            ) : (
              <Feather name="moon" size={30} color={"white"} />
            )}
          </TouchableOpacity>
        </View>
        <CreateTodo />
        <View className="flex flex-col w-full overflow-hidden bg-white shadow-lg rounded-xl dark:bg-slate-800">
          {filteredTodos.length > 0 ? (
            filter === "all" ? (
              <DraggableFlatList
                data={filteredTodos}
                keyExtractor={(item) => item._id}
                onDragEnd={({ data }) => {
                  setOrderedTodos(data);
                }}
                activationDistance={20}
                contentContainerStyle={{ paddingVertical: 4 }}
                ListFooterComponent={() => listFooter}
                renderItem={({ item, drag, isActive }) => (
                  <ScaleDecorator>
                    <TouchableOpacity
                      onLongPress={drag}
                      disabled={isActive}
                      activeOpacity={0.9}
                    >
                      <Todo
                        text={item.text}
                        checked={item.completed}
                        id={item._id}
                      />
                    </TouchableOpacity>
                  </ScaleDecorator>
                )}
              />
            ) : (
              <>
                {filteredTodos.map((todo) => (
                  <Todo
                    text={todo.text}
                    checked={todo.completed}
                    id={todo._id}
                    key={todo._id}
                  />
                ))}
                {listFooter}
              </>
            )
          ) : (
            <>
              <View className="items-center justify-center py-10">
                <Text className="text-sm text-[#9495A5] dark:text-[#5B5E7E]">
                  Nothing here yet. Create your first todo above!
                </Text>
              </View>
              {listFooter}
            </>
          )}
        </View>
        <View className="flex-row items-center w-full px-10 py-5 bg-white shadow-md justify-evenly rounded-xl dark:bg-slate-800">
          {(
            [
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Completed", value: "completed" },
            ] as const
          ).map(({ label, value }) => {
            const isActive = filter === value;
            const baseColor = "text-[#9495A5] dark:text-[#5B5E7E]";
            const activeColor = "text-blue-500";
            return (
              <TouchableOpacity
                key={value}
                onPress={() => setFilter(value)}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <Text
                  className={`text-sm font-semibold tracking-[2px] uppercase ${
                    isActive ? activeColor : baseColor
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="text-gray-500">Drag and drop to reorder list</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
  },
});
