import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
    FlatList,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import Recipes from "@/components/recipes";

export default function Home() {
  //const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);

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
    {
      id: "4",
      nome: "Doces",
      imagem: require("../../assets/images/doces.jpg"),
    },
    {
      id: "5",
      nome: "Vegetais",
      imagem: require("../../assets/images/vegetais.jpg"),
    },
  ];

  const receitas = [
    {
      id: "1",
      nome: "Bolos famosos da tia Flávia",
      imagem: require("../../assets/images/brazilianreceitas.jpg"),
      autor: "Tia Flávia",
      autorFoto: require("../../assets/images/profile-icon.svg"),
      data: "18/10/2025 às 15:35",
      favoritos: 16,
    },
    {
      id: "2",
      nome: "Macarrão ao molho vermelho",
      imagem: require("../../assets/images/massas.jpg"),
      autor: "Tio Marcio",
      autorFoto: require("../../assets/images/profile-icon.svg"),
      data: "20/02/2026 às 10:00",
      favoritos: 32,
    },
    {
      id: "3",
      nome: "Suco de Laranja",
      imagem: require("../../assets/images/sucos.jpg"),
      autor: "Tio Marcio",
      autorFoto: require("../../assets/images/profile-icon.svg"),
      data: "21/02/2026 às 12:59",
      favoritos: 322,
    },
    {
      id: "4",
      nome: "Brigadeiros",
      imagem: require("../../assets/images/doces.jpg"),
      autor: "Tia Flávia",
      autorFoto: require("../../assets/images/profile-icon.svg"),
      data: "22/03/2026 às 15:08",
      favoritos: 122,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              style={[styles.input, focus && styles.inputFocused]}
              placeholder="Procure por uma receita"
              placeholderTextColor="#999999"
              keyboardType="default"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          </View>
        </View>

        <View style={styles.cardView}>
          <FlatList
            data={categorias}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.8} style={styles.cardShadow}>
                <ImageBackground
                  source={item.imagem}
                  style={styles.card}
                  imageStyle={{ borderRadius: 18 }}
                >
                  <View style={styles.overlay} />
                  <Text style={styles.cardText}>{item.nome}</Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
        <Text style={styles.minorTitle}>
          Principais <Text style={{ color: "#E96B35" }}>Receitas</Text>
        </Text>
        {receitas.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.receitaCard,
              { elevation: 0, shadowColor: "transparent" },
            ]}
            activeOpacity={1}
          >
            <Text style={styles.receitaNome}>{item.nome}</Text>
            <TouchableOpacity activeOpacity={0.75}>
              <Image source={item.imagem} style={styles.receitaImagem} />
            </TouchableOpacity>
            <View style={styles.receitaFooter}>
              <Image source={item.autorFoto} style={styles.autorAvatar} />
              <View style={styles.receitaInfo}>
                <Text style={styles.autorNome}>{item.autor}</Text>
                <Text style={styles.receitaData}>{item.data}</Text>
                <View style={styles.favoritosRow}>
                  <Ionicons name="star" size={14} color="#F5A623" />
                  <Text style={styles.favoritosText}>
                    {item.favoritos} favoritos
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  titleContainer: {
    paddingHorizontal: 30,
    paddingTop: 25,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "500",
    paddingHorizontal: 20,
  },
  minorTitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 18,
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
    borderWidth: 2,
    borderColor: "#dfdfdf"
  },
  inputFocused: {
    borderColor: "#E96B35",
    borderWidth: 2,
  },
  cardView: {
    marginTop: 20,
  },
  cardShadow: {
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  card: {
    width: 180,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cardText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    width: 90,
    textAlign: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 18,
  },
  receitaCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowRadius: 8,
    elevation: 4,
    paddingBottom: 14,
  },
  receitaNome: {
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#dfdfdf",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#ededed52",
  },
  receitaImagem: {
    width: "100%",
    height: 185,
  },
  receitaFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: "#dfdfdf",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "#ededed52",
  },
  autorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#E96B35",
    backgroundColor: "#ddd",
  },
  receitaInfo: {
    flex: 1,
  },
  autorNome: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },
  receitaData: {
    fontSize: 13,
    color: "#888",
  },
  favoritosRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  favoritosText: {
    fontSize: 13,
    color: "#555",
  },
});
