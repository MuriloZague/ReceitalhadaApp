import { useFonts } from "expo-font";

export function useInterFont() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });

  return fontsLoaded;
}
