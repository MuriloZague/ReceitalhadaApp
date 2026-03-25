import { RootStackParamList } from "@/app/(tabs)";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../services/connectionFirebase";

type NavProp = StackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavProp>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

            <TouchableOpacity>
              <Text
                style={{ color: "#E96B35", textDecorationLine: "underline" }}
              >
                Esqueci a senha
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.7}>
              <Text
                style={{
                  fontSize: 17,
                  color: "white",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Cadastrar
              </Text>
            </TouchableOpacity>

            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Ainda Não Possui Uma Conta?{" "}
              <TouchableOpacity
                style={{ marginTop: 4 }}
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                <Text
                  style={{ color: "#E96B35", textDecorationLine: "underline" }}
                >
                  Entre!
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
  },
  submitBtn: {
    backgroundColor: "#E96B35",
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
});
