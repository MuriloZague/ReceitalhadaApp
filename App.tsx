import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import RootStack from "./app/(tabs)/index";
import { useInterFont } from "./hooks/useInterFont";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontsLoaded = useInterFont();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
