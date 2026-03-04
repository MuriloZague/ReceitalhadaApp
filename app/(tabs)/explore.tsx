import { Image } from "expo-image";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.headerApp}>
        <Image
          style={{ width: 155, height: 30 }}
          source={require("../../assets/images/logoReceitalhada.png")}
        />
      </View>
      <View style={styles.loginForm}>
        <View>
          <Text>Bem Vindo Ao Receitalhada!</Text>
        </View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerApp: {
    paddingHorizontal: 30,
    paddingBottom: 21,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 8,
    borderBottomColor: "#E96B35",
  },
  loginForm: {
    borderWidth: 2,
    borderColor: "#E96B35",
  },
});
