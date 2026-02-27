import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [text, setText] = useState("");

  const categorias = [
    {
      id: "1",
      nome: "Receitas Brasileiras",
      imagem: require("../../assets/images/brazilianreceitas.jpg"),
    },
    {
      id: "2",
      nome: "Massas",
      imagem: require("../../assets/images/massas.jpg"),
    },
    {
      id: "3",
      nome: "Sucos",
      imagem: require("../../assets/images/sucos.jpg"),
    },
    
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Encontre A <Text style={{ color: "#E96B35" }}>Melhor Receita</Text>{" "}
            Para A Sua Fome
          </Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="search"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
              placeholder="Procure por uma receita"
              placeholderTextColor="#999999"
              keyboardType="default"
            />
          </View>
        </View>
        <View>
          <FlatList
            data={categorias}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 30, gap: 12 }}
            renderItem={({ item }) => (
              <ImageBackground
                source={item.imagem}
                style={styles.card}
                imageStyle={{ borderRadius: 12 }}
              >
                <Text style={styles.cardText}>{item.nome}</Text>
              </ImageBackground>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerApp: {
    paddingHorizontal: 30,
    paddingBottom: 16,
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 8,
    borderBottomColor: "#E96B35",
  },
  titleContainer: {
    paddingHorizontal: 30,
    paddingTop: 25,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: 500,
    paddingHorizontal: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  inputWrapper: {
    marginTop: 25,
    position: "relative",
    justifyContent: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    zIndex: 1,
  },
  input: {
    height: 45,
    backgroundColor: "#dfdfdf",
    paddingLeft: 42,
    paddingRight: 16,
    borderRadius: 100,
    fontSize: 15,
  },
  card: {
    width: 150,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cardText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
