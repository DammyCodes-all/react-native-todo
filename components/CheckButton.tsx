import { Feather } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";

interface CheckButtonProps {
  initialChecked?: boolean;
  onToggle?: (checked: boolean) => void;
  size?: number;
}

export const CheckButton = ({
  initialChecked = false,
  onToggle,
  size = 32,
}: CheckButtonProps) => {
  const [checked, setChecked] = useState(initialChecked);

  useEffect(() => {
    setChecked(initialChecked);
  }, [initialChecked]);

  const dimensionClass = useMemo(() => {
    if (size >= 40) {
      return "h-10 w-10";
    }
    if (size <= 24) {
      return "h-6 w-6";
    }
    return "h-8 w-8";
  }, [size]);

  const iconSize = useMemo(() => {
    if (size >= 40) {
      return 22;
    }
    if (size <= 24) {
      return 12;
    }
    return 16;
  }, [size]);

  const handlePress = useCallback(() => {
    setChecked((prev) => {
      const next = !prev;
      onToggle?.(next);
      return next;
    });
  }, [onToggle]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className={`items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 ${
        checked ? "bg-indigo-500" : "bg-transparent"
      } ${dimensionClass}`}
      style={{ height: size, width: size, borderRadius: size / 2 }}
    >
      {checked ? <Feather name="check" size={iconSize} color="white" /> : null}
    </TouchableOpacity>
  );
};
