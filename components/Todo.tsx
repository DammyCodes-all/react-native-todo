import { useCallback } from "react";
import { Text, View } from "react-native";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { CheckButton } from "./CheckButton";
import { DeleteButton } from "./DeleteButton";

type TodoProps = {
  id: Id<"todos">;
  text: string;
  checked: boolean;
};

export const Todo = ({ id, text, checked }: TodoProps) => {
  const updateTodo = useMutation(api.todos.updateTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleToggle = useCallback(
    async (nextChecked: boolean) => {
      try {
        await updateTodo({ id, text, completed: nextChecked });
      } catch (error) {
        console.error("Failed to update todo", error);
      }
    },
    [id, text, updateTodo]
  );

  const handleDelete = useCallback(async () => {
    try {
      await deleteTodo({ id });
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  }, [deleteTodo, id]);

  return (
    <View className="w-full px-4 py-3 gap-3 flex flex-row items-center  border-b border-b-[#E3E4F1] dark:border-b-slate-600">
      <CheckButton initialChecked={checked} size={24} onToggle={handleToggle} />
      <Text
        className={`flex-1 text-base ${
          checked
            ? "text-slate-400 line-through"
            : "text-slate-900 dark:text-slate-100"
        }`}
      >
        {text}
      </Text>
      <DeleteButton onPress={handleDelete} color="#cbd5e1" />
    </View>
  );
};
