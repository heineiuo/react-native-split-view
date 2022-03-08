import { useWindowDimensions } from "react-native";

export function useCanSplit() {
  const { width } = useWindowDimensions();
  return width > 1024;
}
