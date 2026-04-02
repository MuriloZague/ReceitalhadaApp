import { RootStackParamList } from "@/app/(tabs)";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Platform,
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

      showAlert("Login realizado com sucesso!");

      // limpar campos
      setEmail("");
      setPassword("");
      setLoading(false);

      // opcional: navegar para área do usuário
      navigation.navigate("InitialScreen");
      // navigation.navigate("AreaUser");
    } catch (error: any) {
      setLoading(false);
      showAlert("E-mail ou senha inválidos");
      setMensagem("Erro ao realizar login");
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateFields(): boolean {
    if (!email || !password) {
      showAlert("Preencha todos os campos");
      setMensagem("Preencha todos os campos");
      return false;
    }

    if (!emailRegex.test(email)) {
      showAlert("Digite um e-mail válido");
      setMensagem("Digite um e-mail válido");
      return false;
    }

    return true;
  }

  function showAlert(msg: string) {
    if (Platform.OS === "web") {
      alert(msg);
    } else {
      Alert.alert("Atenção", msg);
    }
  }

  const mensagemColor = mensagem.includes("sucesso") ? "green" : "red";

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
      <View style={styles.loginForm}>
        <View style={styles.form}>
          <View style={styles.boxTitleForm}>
            <Text style={styles.titleForm}>
              <Text style={{ color: "#E96B35" }}>Bem Vindo </Text>
              De Volta!
            </Text>
          </View>
          <View style={styles.formContent}>
            <Text style={styles.labelText}>E-mail</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="email@email.com"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
            />

            <Text style={styles.labelText}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="********"
              secureTextEntry
              value={password}
              onChangeText={(text: string) => setPassword(text)}
            />

            <TouchableOpacity
              onPress={() => showAlert("em desenvolvimento...")}
            >
              <Text
                style={{
                  color: "#E96B35",
                  textDecorationLine: "underline",
                  fontFamily: "Inter-Regular",
                }}
              >
                Esqueci a senha
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
              disabled={loading}
              activeOpacity={0.7}
              onPress={login}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: "white",
                  fontWeight: 500,
                  textAlign: "center",
                  fontFamily: "Inter-Regular",
                }}
              >
                Entrar
              </Text>
            </TouchableOpacity>

            {mensagem ? (
              <Text
                style={{
                  color: mensagemColor,
                  marginTop: 16,
                  textAlign: "center",
                  fontFamily: "Inter-Regular",
                }}
              >
                {mensagem}
              </Text>
            ) : null}

            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                fontFamily: "Inter-Regular",
              }}
            >
              Ainda Não Possui Uma Conta?{" "}
              <TouchableOpacity
                style={{ marginTop: 4 }}
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                <Text
                  style={{ color: "#E96B35", textDecorationLine: "underline" }}
                >
                  Crie uma!
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
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
    fontWeight: 600,
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
    fontWeight: 500,
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
});
