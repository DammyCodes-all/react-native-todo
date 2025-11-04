import { useCallback, useState } from "react";
import { TextInput, View } from "react-native";
import { CheckButton } from "./CheckButton";
import { AddButton } from "./AddButton";
import { useColorScheme } from "nativewind";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
export const CreateTodo = () => {
  const createTodo = useMutation(api.todos.createTodo);
  const [todoText, setTodoText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const { colorScheme } = useColorScheme();
  const handleAdd = useCallback(async () => {
    if (!todoText.trim()) {
      return;
    }
    const todo = await createTodo({
      text: todoText,
      completed: isCompleted,
    });
    console.log(todo);
    setTodoText("");
    setIsCompleted(false);
  }, [todoText, isCompleted, createTodo]);
  return (
    <View className="bg-white dark:bg-slate-800 px-4 py-3 w-full rounded-xl flex flex-row items-center gap-3">
      <CheckButton
        initialChecked={isCompleted}
        onToggle={setIsCompleted}
        size={24}
      />
      <TextInput
        className="flex-1 text-base text-slate-900 dark:text-slate-100"
        placeholder="Create a new todo..."
        placeholderTextColor="#94a3b8"
        value={todoText}
        onChangeText={setTodoText}
      />
      {todoText.length > 0 && (
        <AddButton
          onPress={handleAdd}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      )}
    </View>
  );
};
