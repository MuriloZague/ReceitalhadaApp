import { RootStackParamList } from "@/app/(tabs)";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import React from "react";
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.headerApp}>
        <Image
          style={{ width: 155, height: 30 }}
          source={require("../../assets/images/logoReceitalhada.png")}
        />
        <Image
          style={{ width: 35, height: 35 }}
          source={require("../../assets/images/profile-icon.svg")}
        />
      </View>
      <View style={styles.mainContainer}>
        <Image
          style={{ width: 240, height: 40, marginBottom: 20 }}
          source={require("../../assets/images/logoReceitalhada.png")}
        />
        <TouchableOpacity style={styles.btnStart} activeOpacity={0.5} onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.textBtn}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStart} activeOpacity={0.5} onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.textBtn} >Criar uma Conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerApp: {
    paddingHorizontal: 30,
    paddingBottom: 16,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 8,
    borderBottomColor: "#E96B35",
  },
  mainContainer: {
    margin: 50,
    marginTop: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnStart: {
    marginTop: 12,
    backgroundColor: "#E96B35",
    paddingVertical: 8,
    borderRadius: 10,
    width: '60%',
  },
  textBtn: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  textAccount: {
    marginTop: 10,
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
