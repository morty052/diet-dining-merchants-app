import { Platform } from "react-native";

export const SEMI_BOLD = Platform.select({
  android: "Inter_600SemiBold",
  ios: "Inter-SemiBold",
});
