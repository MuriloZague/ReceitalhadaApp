import { Platform } from "react-native";

const softShadow = Platform.select({
  ios: {
    shadowColor: "#7B4A2A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
  },
  android: {
    elevation: 6,
  },
  default: {},
});

const strongShadow = Platform.select({
  ios: {
    shadowColor: "#7B4A2A",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
  },
  android: {
    elevation: 10,
  },
  default: {},
});

export const appTheme = {
  colors: {
    background: "#FFF8F3",
    surface: "#FFFFFF",
    surfaceMuted: "#FFF1E6",
    primary: "#F97316",
    primaryDark: "#D4550B",
    primaryTint: "#FFE2CE",
    accent: "#0F766E",
    textPrimary: "#231B16",
    textSecondary: "#6F6157",
    textMuted: "#8D8177",
    border: "#F3D8C1",
    divider: "#F6E5D7",
    danger: "#C2410C",
    success: "#15803D",
    white: "#FFFFFF",
  },
  radius: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 22,
    pill: 999,
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  typography: {
    family: "Inter-Regular",
    display: 34,
    title: 26,
    sectionTitle: 21,
    body: 15,
    caption: 13,
  },
  shadows: {
    soft: softShadow,
    strong: strongShadow,
  },
} as const;
