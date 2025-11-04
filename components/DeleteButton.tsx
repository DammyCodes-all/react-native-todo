import { Feather } from "@expo/vector-icons";
import { memo, useMemo } from "react";
import { TouchableOpacity } from "react-native";

type DeleteButtonProps = {
  onPress?: () => void;
  size?: number;
  color?: string;
};

export const DeleteButton = memo(
  ({ onPress, size = 28, color = "#ef4444" }: DeleteButtonProps) => {
    const hitSlop = useMemo(
      () => ({ top: 6, right: 6, bottom: 6, left: 6 }),
      []
    );

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        hitSlop={hitSlop}
        accessibilityRole="button"
        className="p-1"
      >
        <Feather name="x" size={size} color={color} />
      </TouchableOpacity>
    );
  }
);

DeleteButton.displayName = "DeleteButton";
