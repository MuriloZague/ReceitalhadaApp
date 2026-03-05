import { Image } from "expo-image";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {

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
          style={{ width: 240, height: 40 }}
          source={require("../../assets/images/logoReceitalhada.png")}
        />
        <TouchableOpacity style={styles.btnStart} activeOpacity={0.5}>
          <Text style={styles.textBtn}>Iniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3}>
          <Text style={styles.textAccount}>Não possui uma conta?</Text>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStart: {
    marginTop: 18,
    backgroundColor: "#E96B35",
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  textBtn: {
    textAlign: 'center',
    fontSize: 22,
    color: 'white'
  },
  textAccount: {
    marginTop: 10,
    textDecorationLine: 'underline',
    fontSize: 14
  }
});
