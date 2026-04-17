import { RootStackParamList } from "@/app/(tabs)";
import Waves from "@/components/waves";
import { appTheme } from "@/src/styles/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NavProp = StackNavigationProp<RootStackParamList>;

//usar 'npx expo start --tunnel' para iniciar o projeto e nao dar erro ao conectar no expo go
export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topOrb} />
      <View style={styles.bottomOrb} />

      <View style={styles.headerApp}>
        <Image
          style={{ width: 155, height: 30 }}
          source={require("../../assets/images/logoReceitalhada.png")}
        />

        <View style={styles.headerPill}>
          <Ionicons name="sparkles-outline" size={14} color="#D4550B" />
          <Text style={styles.headerPillText}>Nova experiência</Text>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>RECEITAS COM IDENTIDADE</Text>
          <Text style={styles.heroTitle}>
            Cozinhar melhor<Text style={styles.heroTitleAccent}> começa </Text>
            com organização.
          </Text>
          <Text style={styles.heroSubtitle}>
            Crie receitas, salve suas favoritas e compartilhe momentos com
            praticidade e estilo.
          </Text>

        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.btnStart, styles.btnPrimary]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.textBtn}>Entrar agora</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnStart, styles.btnSecondary]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.textBtnSecondary}>Criar conta gratuita</Text>
            <Ionicons name="person-add-outline" size={18} color="#D4550B" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.waveContainer}>
        <Waves height={120} color={appTheme.colors.primary} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
  },
  topOrb: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: appTheme.radius.pill,
    backgroundColor: "#FFE4D0",
    top: -90,
    right: -70,
  },
  bottomOrb: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: appTheme.radius.pill,
    backgroundColor: "#FFEEDF",
    bottom: 50,
    left: -110,
  },
  headerApp: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.divider,
  },
  headerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: appTheme.colors.primaryTint,
    borderRadius: appTheme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  headerPillText: {
    color: appTheme.colors.primaryDark,
    fontSize: 12,
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 26,
  },
  heroCard: {
    backgroundColor: appTheme.colors.surface,
    borderRadius: appTheme.radius.lg,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    padding: 22,
    ...appTheme.shadows.soft,
  },
  heroEyebrow: {
    fontSize: 11,
    letterSpacing: 1.2,
    color: appTheme.colors.primaryDark,
    marginBottom: 12,
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
  heroTitle: {
    fontSize: 34,
    lineHeight: 39,
    color: appTheme.colors.textPrimary,
    fontWeight: "800",
    fontFamily: appTheme.typography.family,
  },
  heroTitleAccent: {
    color: appTheme.colors.primary,
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 23,
    marginTop: 14,
    color: appTheme.colors.textSecondary,
    fontFamily: appTheme.typography.family,
  },
  heroTagRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  heroTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#E6FFFB",
    borderWidth: 1,
    borderColor: "#B7ECE4",
    borderRadius: appTheme.radius.pill,
  },
  heroTagText: {
    color: appTheme.colors.accent,
    fontSize: 12,
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  btnStart: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: appTheme.radius.md,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  btnPrimary: {
    backgroundColor: appTheme.colors.primary,
    ...appTheme.shadows.strong,
  },
  btnSecondary: {
    backgroundColor: appTheme.colors.surface,
    borderWidth: 1.5,
    borderColor: appTheme.colors.border,
  },
  textBtn: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: "white",
    fontFamily: appTheme.typography.family,
  },
  textBtnSecondary: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: appTheme.colors.primaryDark,
    fontFamily: appTheme.typography.family,
  },
  waveContainer: {
    marginBottom: -4,
  },
});
