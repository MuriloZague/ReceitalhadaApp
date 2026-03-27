import { RootStackParamList } from "@/app/(tabs)";
import Waves from "@/components/waves";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width } = Dimensions.get("window");

type NavProp = StackNavigationProp<RootStackParamList>;

//usar 'npx expo start --tunnel' para iniciar o projeto e nao dar erro ao conectar no expo go
export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const [pressedBtn, setPressedBtn] = useState<string | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <View style={styles.headerApp}>
        <Image
          style={{ width: 155, height: 30 }}
          source={require("../../assets/images/logoReceitalhada.png")}
        />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={{ width: 240, height: 40 }}
            source={require("../../assets/images/logoReceitalhada.png")}
          />
          <Text style={styles.tagline}>Suas receitas, suas histórias</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.btnStart,
              styles.btnPrimary,
              pressedBtn === "login" && styles.btnPressed,
            ]}
            activeOpacity={0.8}
            onPress={() => {
              setPressedBtn("login");
              setTimeout(() => navigation.navigate("LoginScreen"), 100);
            }}
          >
            <Text style={styles.textBtn}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btnStart,
              styles.btnSecondary,
              pressedBtn === "register" && styles.btnPressedSecondary,
            ]}
            activeOpacity={0.8}
            onPress={() => {
              setPressedBtn("register");
              setTimeout(() => navigation.navigate("RegisterScreen"), 100);
            }}
          >
            <Text style={styles.textBtnSecondary}>Criar uma Conta</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Waves height={120} color="#E96B35" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerApp: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderBottomWidth: 8,
    borderBottomColor: "#E96B35",
  },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF4F0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    position: "relative",
    overflow: "hidden",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  tagline: {
    marginTop: 1,
    fontSize: 16,
    color: "#A0A0A0",
    fontWeight: "500",
    letterSpacing: 0.3,
    fontFamily: "Inter-Regular",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  btnStart: {
    paddingVertical: 16,
    borderRadius: 14,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#E96B35",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  btnPrimary: {
    backgroundColor: "#E96B35",
  },
  btnPressed: {
    backgroundColor: "#D65A2B",
    transform: [{ scale: 0.98 }],
  },
  btnSecondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E96B35",
  },
  btnPressedSecondary: {
    backgroundColor: "#FFF4F0",
    transform: [{ scale: 0.98 }],
  },
  textBtn: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    letterSpacing: 0.5,
    fontFamily: "Inter-Regular",
  },
  textBtnSecondary: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#E96B35",
    letterSpacing: 0.5,
    fontFamily: "Inter-Regular",
  },
  textAccount: {
    marginTop: 10,
    textDecorationLine: "underline",
    fontSize: 14,
  },
  decorationCircle1: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(233, 107, 53, 0.06)",
    bottom: -40,
    right: -40,
  },
  decorationCircle2: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(233, 107, 53, 0.04)",
    top: -30,
    left: -30,
  },
});
