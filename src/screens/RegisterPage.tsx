import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <View style={styles.form}>
          <View style={styles.boxTitleForm}>
            <Text style={styles.titleForm}>
              Bem Vindo Ao{" "}
              <Text style={{ color: "#E96B35" }}>Receitalhada!</Text>
            </Text>
          </View>
          <View style={styles.formContent}>
            <Text style={styles.labelText}>Nome</Text>
            <TextInput style={styles.input} placeholder="Seu Nome" />
            <Text style={styles.labelText}>E-mail</Text>
            <TextInput style={styles.input} placeholder="email@email.com" />
            <Text style={styles.labelText}>Telefone</Text>
            <TextInput style={styles.input} placeholder="(12) 3456-78901" />
            <Text style={styles.labelText}>Senha</Text>
            <TextInput style={styles.input} placeholder="********" />
            <Text style={styles.labelText}>Confirme Sua Senha</Text>
            <TextInput style={styles.input} placeholder="********" />

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
    marginHorizontal: 20,
    marginTop: 50,
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
    paddingVertical: 20,
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
