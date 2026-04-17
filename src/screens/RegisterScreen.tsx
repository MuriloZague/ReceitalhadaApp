import { RootStackParamList } from "@/app/(tabs)";
import { appTheme } from "@/src/styles/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import React, { useState } from "react";
import {
  Alert,
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
import { auth, database } from "../services/connectionFirebase";

type NavProp = StackNavigationProp<RootStackParamList>;

// Aplica máscara de telefone: (XX) XXXXX-XXXX
function applyPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/^(\d{0,2})/, "($1");
  if (digits.length <= 7) return digits.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

export default function RegisterScreen() {
  const navigation = useNavigation<NavProp>();

  const [name, setName] = useState<string>("");
  const [cellphone, setCellphone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleCellphoneChange(text: string): void {
    setCellphone(applyPhoneMask(text));
  }

  async function registerUser(): Promise<void> {
    if (!name || !email || !cellphone || !password || !confirmPassword) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    if (password.length < 8) {
      setMensagem("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    setMensagem("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;
      if (user) {
        await set(ref(database, "users/" + user.uid), {
          uid: user.uid,
          name,
          cellphone,
          email,
          createdAt: new Date().toISOString(),
        });
      }

      if (Platform.OS === "web") {
        alert("Usuário cadastrado com sucesso!");
      } else {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      }

      setMensagem("Usuário cadastrado com sucesso!");
      setName("");
      setCellphone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      if (Platform.OS === "web") {
        alert(error.message);
      } else {
        Alert.alert("Erro", error.message);
      }
      setMensagem("Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  }

  // Cor da mensagem: verde se sucesso, vermelho se erro
  const mensagemColor = mensagem.includes("sucesso")
    ? appTheme.colors.success
    : appTheme.colors.danger;

  // Indicador visual de força da senha
  const passwordStrength =
    password.length === 0
      ? null
      : password.length < 8
        ? { label: "Senha fraca", color: "#e53e3e" }
        : password.length < 12
          ? { label: "Senha razoavel", color: "#dd6b20" }
          : { label: "Senha forte", color: "#38a169" };

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
          <Ionicons name="person-add-outline" size={14} color="#D4550B" />
          <Text style={styles.headerBadgeText}>Cadastro</Text>
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
              Criar sua conta no
              <Text style={styles.titleAccent}> Receitalhada</Text>
            </Text>
            <Text style={styles.subtitleForm}>
              Preencha seus dados para publicar e salvar receitas com
              facilidade.
            </Text>

            <View style={styles.formContent}>
              <Text style={styles.labelText}>Nome</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={appTheme.colors.textMuted}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Seu Nome"
                  placeholderTextColor={appTheme.colors.textMuted}
                  value={name}
                  onChangeText={(text: string) => setName(text)}
                />
              </View>

              <Text style={styles.labelText}>E-mail</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={appTheme.colors.textMuted}
                />
                <TextInput
                  style={styles.input}
                  placeholder="email@exemplo.com"
                  placeholderTextColor={appTheme.colors.textMuted}
                  value={email}
                  onChangeText={(text: string) => setEmail(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <Text style={styles.labelText}>Telefone</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={appTheme.colors.textMuted}
                />
                <TextInput
                  style={styles.input}
                  placeholder="(12) 34567-8901"
                  placeholderTextColor={appTheme.colors.textMuted}
                  value={cellphone}
                  onChangeText={handleCellphoneChange}
                  keyboardType="phone-pad"
                  maxLength={16}
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
                  placeholder="Mínimo 8 caracteres"
                  placeholderTextColor={appTheme.colors.textMuted}
                  secureTextEntry
                  value={password}
                  onChangeText={(text: string) => setPassword(text)}
                />
              </View>

              {passwordStrength && (
                <Text
                  style={[
                    styles.strengthText,
                    { color: passwordStrength.color },
                  ]}
                >
                  {passwordStrength.label}
                </Text>
              )}

              <Text style={[styles.labelText, styles.confirmLabel]}>
                Confirmar Senha
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  confirmPassword.length > 0 && {
                    borderWidth: 1.5,
                    borderColor:
                      confirmPassword === password
                        ? appTheme.colors.success
                        : appTheme.colors.danger,
                  },
                ]}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color={appTheme.colors.textMuted}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Repita sua senha"
                  placeholderTextColor={appTheme.colors.textMuted}
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={(text: string) => setConfirmPassword(text)}
                />
              </View>

              {confirmPassword.length > 0 && (
                <View style={styles.confirmationRow}>
                  <Ionicons
                    name={
                      confirmPassword === password
                        ? "checkmark-circle-outline"
                        : "close-circle-outline"
                    }
                    size={14}
                    color={
                      confirmPassword === password
                        ? appTheme.colors.success
                        : appTheme.colors.danger
                    }
                  />
                  <Text
                    style={[
                      styles.confirmationText,
                      {
                        color:
                          confirmPassword === password
                            ? appTheme.colors.success
                            : appTheme.colors.danger,
                      },
                    ]}
                  >
                    {confirmPassword === password
                      ? "Senhas coincidem"
                      : "Senhas nao coincidem"}
                  </Text>
                </View>
              )}

              {mensagem ? (
                <Text style={[styles.feedbackText, { color: mensagemColor }]}>
                  {mensagem}
                </Text>
              ) : null}

              <TouchableOpacity
                style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                activeOpacity={0.7}
                onPress={registerUser}
                disabled={loading}
              >
                <Text style={styles.submitBtnText}>
                  {loading ? "Cadastrando..." : "Cadastrar"}
                </Text>
              </TouchableOpacity>

              <View style={styles.redirectRow}>
                <Text style={styles.redirectText}>Ja possui uma conta?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Text style={styles.redirectLink}>Entre</Text>
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
    width: 250,
    height: 250,
    borderRadius: appTheme.radius.pill,
    backgroundColor: "#FFE7D5",
    top: -90,
    right: -100,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 36,
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
    marginTop: 30,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    borderRadius: appTheme.radius.lg,
    backgroundColor: appTheme.colors.surface,
    padding: 20,
    ...appTheme.shadows.soft,
  },
  formContent: {
    gap: 8,
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
    marginBottom: 20,
    color: appTheme.colors.textSecondary,
    lineHeight: 22,
    fontSize: 15,
    fontFamily: appTheme.typography.family,
  },
  labelText: {
    fontSize: 13,
    color: appTheme.colors.textSecondary,
    fontWeight: "700",
    letterSpacing: 0.2,
    fontFamily: appTheme.typography.family,
  },
  confirmLabel: {
    marginTop: 2,
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
    marginBottom: 6,
  },
  input: {
    flex: 1,
    color: appTheme.colors.textPrimary,
    fontSize: 15,
    fontFamily: appTheme.typography.family,
    paddingVertical: 14,
  },
  submitBtn: {
    backgroundColor: appTheme.colors.primary,
    minHeight: 52,
    borderRadius: appTheme.radius.sm,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    ...appTheme.shadows.strong,
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitBtnText: {
    fontSize: 16,
    color: appTheme.colors.white,
    fontWeight: "800",
    textAlign: "center",
    fontFamily: appTheme.typography.family,
  },
  strengthText: {
    fontSize: 12,
    marginTop: -2,
    marginBottom: 8,
    fontFamily: appTheme.typography.family,
  },
  confirmationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: -2,
    marginBottom: 8,
  },
  confirmationText: {
    fontSize: 12,
    fontFamily: appTheme.typography.family,
  },
  feedbackText: {
    marginBottom: 4,
    fontWeight: "600",
    fontFamily: appTheme.typography.family,
  },
  redirectRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
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
