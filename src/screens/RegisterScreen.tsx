import { RootStackParamList } from "@/app/(tabs)";
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
  const mensagemColor = mensagem.includes("sucesso") ? "green" : "red";

  // Indicador visual de força da senha
  const passwordStrength =
    password.length === 0
      ? null
      : password.length < 8
        ? { label: "Senha fraca", color: "#e53e3e" }
        : password.length < 12
          ? { label: "Senha razoável", color: "#dd6b20" }
          : { label: "Senha forte", color: "#38a169" };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.headerApp}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ width: 155, height: 30 }}
            source={require("../../assets/images/logoReceitalhada.png")}
          />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.loginForm}>
            <View style={styles.form}>
              <View style={styles.boxTitleForm}>
                <Text style={styles.titleForm}>
                  Bem Vindo Ao{" "}
                  <Text style={{ color: "#E96B35" }}>Receitalhada!</Text>
                </Text>
              </View>

              <View style={styles.formContent}>
                <Text style={styles.labelText}>Nome</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Seu Nome"
                  value={name}
                  onChangeText={(text: string) => setName(text)}
                />

                <Text style={styles.labelText}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  placeholder="email@email.com"
                  value={email}
                  onChangeText={(text: string) => setEmail(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={styles.labelText}>Telefone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="(12) 34567-8901"
                  value={cellphone}
                  onChangeText={handleCellphoneChange}
                  keyboardType="phone-pad"
                  maxLength={16}
                />

                <Text style={styles.labelText}>Senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Mínimo 8 caracteres"
                  secureTextEntry
                  value={password}
                  onChangeText={(text: string) => setPassword(text)}
                />
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
                <Text style={[styles.labelText, { marginTop: 4 }]}>
                  Confirmar Senha
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    confirmPassword.length > 0 && {
                      borderWidth: 1.5,
                      borderColor:
                        confirmPassword === password ? "#38a169" : "#e53e3e",
                    },
                  ]}
                  placeholder="Repita sua senha"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={(text: string) => setConfirmPassword(text)}
                />
                {confirmPassword.length > 0 && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: -6,
                      marginBottom: 8,
                      color:
                        confirmPassword === password ? "#38a169" : "#e53e3e",
                      fontFamily: "Inter-Regular",
                    }}
                  >
                    {confirmPassword === password
                      ? "✓ Senhas coincidem"
                      : "✗ Senhas não coincidem"}
                  </Text>
                )}

                {mensagem ? (
                  <Text style={{ color: mensagemColor, marginBottom: 4 }}>
                    {mensagem}
                  </Text>
                ) : null}

                <TouchableOpacity
                  style={[
                    styles.submitBtn,
                    loading && styles.submitBtnDisabled,
                  ]}
                  activeOpacity={0.7}
                  onPress={registerUser}
                  disabled={loading}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: "white",
                      fontWeight: "500",
                      textAlign: "center",
                      fontFamily: "Inter-Regular",
                    }}
                  >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    fontFamily: "Inter-Regular",
                  }}
                >
                  Já Possui Uma Conta?{" "}
                  <TouchableOpacity
                    style={{ marginTop: 4 }}
                    onPress={() => navigation.navigate("LoginScreen")}
                  >
                    <Text
                      style={{
                        color: "#E96B35",
                        textDecorationLine: "underline",
                        fontFamily: "Inter-Regular",
                      }}
                    >
                      Entre!
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginHorizontal: 18,
    marginTop: 55,
    borderWidth: 2,
    borderColor: "#E96B35",
    borderRadius: 16,
  },
  input: {
    backgroundColor: "#dfdfdf",
    borderRadius: 4,
    marginBottom: 10,
    paddingLeft: 10,
    paddingVertical: 8.5,
    fontFamily: "Inter-Regular",
  },
  form: {
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  titleForm: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 5,
    fontFamily: "Inter-Regular",
  },
  boxTitleForm: {
    borderBottomWidth: 2,
    borderBottomColor: "#E96B35",
  },
  formContent: {
    paddingTop: 20,
    paddingBottom: 8,
  },
  labelText: {
    fontSize: 16.5,
    fontWeight: "500",
    fontFamily: "Inter-Regular",
  },
  submitBtn: {
    backgroundColor: "#E96B35",
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  submitBtnDisabled: {
    backgroundColor: "#f0a882",
  },
  strengthText: {
    fontSize: 12,
    marginTop: -6,
    marginBottom: 8,
    fontFamily: "Inter-Regular",
  },
});
