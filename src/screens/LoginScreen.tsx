import { RootStackParamList } from "@/app/(tabs)";
import { appTheme } from "@/src/styles/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../services/connectionFirebase";

type NavProp = StackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavProp>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function login(): Promise<void> {
    if (!validateFields()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // limpar campos
      setEmail("");
      setPassword("");
      setLoading(false);

      navigation.reset({
        index: 0,
        routes: [{ name: "AppTabs" }],
      });
    } catch {
      setLoading(false);
      setMensagem("Erro ao realizar login");
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateFields(): boolean {
    if (!email || !password) {
      setMensagem("Preencha todos os campos");
      return false;
    }

    if (!emailRegex.test(email)) {
      setMensagem("Digite um e-mail válido");
      return false;
    }

    return true;
  }

  const mensagemColor = mensagem.includes("sucesso") ? "green" : "red";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topGlow} />
      <View style={styles.headerApp}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ width: 155, height: 30 }}
            source={require("../../assets/images/logoReceitalhada.png")}
          />
        </TouchableOpacity>

        <View style={styles.headerBadge}>
          <Ionicons name="log-in-outline" size={14} color="#D4550B" />
          <Text style={styles.headerBadgeText}>Acesso</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.loginForm}>
            <Text style={styles.titleForm}>
              <Text style={styles.titleAccent}>Bem-vindo </Text>
              de volta
            </Text>
            <Text style={styles.subtitleForm}>
              Entre para continuar salvando e organizando suas receitas.
            </Text>

            <View style={styles.formContent}>
              <Text style={styles.labelText}>E-mail</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={appTheme.colors.textMuted}
                />
                <TextInput
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="email@exemplo.com"
                  placeholderTextColor={appTheme.colors.textMuted}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(text: string) => setEmail(text)}
                />
              </View>

              <Text style={styles.labelText}>Senha</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={appTheme.colors.textMuted}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Sua senha"
                  placeholderTextColor={appTheme.colors.textMuted}
                  secureTextEntry
                  value={password}
                  onChangeText={(text: string) => setPassword(text)}
                />
              </View>

              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.forgotPassword}>Esqueci a senha</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                disabled={loading}
                activeOpacity={0.8}
                onPress={login}
              >
                {loading ? (
                  <View style={styles.loadingContent}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.submitBtnText}>Entrando...</Text>
                  </View>
                ) : (
                  <Text style={styles.submitBtnText}>Entrar</Text>
                )}
              </TouchableOpacity>

              {mensagem ? (
                <Text style={[styles.feedbackText, { color: mensagemColor }]}>
                  {mensagem}
                </Text>
              ) : null}

              <View style={styles.redirectRow}>
                <Text style={styles.redirectText}>Ainda não possui conta?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("RegisterScreen")}
                >
                  <Text style={styles.redirectLink}>Crie uma</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
  },
  topGlow: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: appTheme.radius.pill,
    backgroundColor: "#FFE7D5",
    top: -100,
    left: -60,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
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
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: appTheme.colors.primaryTint,
    borderRadius: appTheme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  headerBadgeText: {
    color: appTheme.colors.primaryDark,
    fontSize: 12,
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
  loginForm: {
    marginHorizontal: 20,
    marginTop: 42,
    backgroundColor: appTheme.colors.surface,
    borderRadius: appTheme.radius.lg,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    padding: 20,
    ...appTheme.shadows.soft,
  },
  titleForm: {
    fontSize: 30,
    color: appTheme.colors.textPrimary,
    fontWeight: "800",
    fontFamily: appTheme.typography.family,
  },
  titleAccent: {
    color: appTheme.colors.primary,
  },
  subtitleForm: {
    marginTop: 10,
    marginBottom: 22,
    color: appTheme.colors.textSecondary,
    lineHeight: 22,
    fontSize: 15,
    fontFamily: appTheme.typography.family,
  },
  formContent: {
    gap: 8,
  },
  labelText: {
    fontSize: 13,
    color: appTheme.colors.textSecondary,
    fontWeight: "700",
    letterSpacing: 0.2,
    fontFamily: appTheme.typography.family,
  },
  inputContainer: {
    minHeight: 52,
    backgroundColor: appTheme.colors.surfaceMuted,
    borderRadius: appTheme.radius.sm,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    color: appTheme.colors.textPrimary,
    fontSize: 15,
    fontFamily: appTheme.typography.family,
    paddingVertical: 14,
  },
  forgotPassword: {
    color: appTheme.colors.primaryDark,
    textDecorationLine: "underline",
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "600",
    fontFamily: appTheme.typography.family,
  },
  submitBtn: {
    marginTop: 4,
    backgroundColor: appTheme.colors.primary,
    minHeight: 52,
    borderRadius: appTheme.radius.sm,
    justifyContent: "center",
    alignItems: "center",
    ...appTheme.shadows.strong,
  },
  submitBtnDisabled: {
    opacity: 0.75,
  },
  submitBtnText: {
    fontSize: 16,
    color: appTheme.colors.white,
    fontWeight: "800",
    textAlign: "center",
    fontFamily: appTheme.typography.family,
  },
  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  feedbackText: {
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: appTheme.typography.family,
  },
  redirectRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  redirectText: {
    color: appTheme.colors.textSecondary,
    fontSize: 14,
    fontFamily: appTheme.typography.family,
  },
  redirectLink: {
    color: appTheme.colors.primaryDark,
    fontWeight: "700",
    textDecorationLine: "underline",
    fontFamily: appTheme.typography.family,
  },
});
