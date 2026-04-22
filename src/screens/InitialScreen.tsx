import { AppTabParamList } from "@/app/(tabs)";
import { appTheme } from "@/src/styles/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
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

type NavProp = BottomTabNavigationProp<AppTabParamList, "InitialScreen">;

export default function Home() {
  const navigation = useNavigation<NavProp>();

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topGlow} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerApp}>
          <Image
            style={{ width: 155, height: 30 }}
            source={require("../../assets/images/logoReceitalhada.png")}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("DashBoardScreen")}
            style={styles.profileButton}
            activeOpacity={0.8}
          >
            <Ionicons
              name="person-circle-outline"
              size={27}
              color={appTheme.colors.primaryDark}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.eyebrow}>NAVEGUE POR SABORES</Text>
          <Text style={styles.title}>
            Encontre receitas para qualquer momento
          </Text>
          <Text style={styles.subtitle}>
            Descubra pratos, salve ideias e monte seu caderno culinario.
          </Text>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="search"
              size={20}
              color={appTheme.colors.textMuted}
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.input, focus && styles.inputFocused]}
              placeholder="Procure por uma receita"
              placeholderTextColor={appTheme.colors.textMuted}
              keyboardType="default"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          </View>
        </View>

        <View style={styles.cardView}>
          <Text style={styles.sectionLabel}>Categorias</Text>
          <FlatList
            data={categorias}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.8} style={styles.cardShadow}>
                <ImageBackground
                  source={item.imagem}
                  style={styles.card}
                  imageStyle={{ borderRadius: appTheme.radius.md }}
                >
                  <View style={styles.overlay} />
                  <Text style={styles.cardText}>{item.nome}</Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.recipeHeader}>
          <Text style={styles.minorTitle}>Receitas em alta</Text>
          <Text style={styles.recipeCounter}>{receitas.length} resultados</Text>
        </View>

        {receitas.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.receitaCard}
            activeOpacity={0.9}
          >
            <Image source={item.imagem} style={styles.receitaImagem} />

            <View style={styles.receitaBody}>
              <View style={styles.recipeBadgeRow}>
                <View style={styles.categoryPill}>
                  <Text style={styles.categoryPillText}>{item.autor}</Text>
                </View>
                <View style={styles.ratingPill}>
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text style={styles.ratingText}>{item.favoritos}</Text>
                </View>
              </View>

              <Text style={styles.receitaNome}>{item.nome}</Text>

              <View style={styles.receitaFooter}>
                <Image source={item.autorFoto} style={styles.autorAvatar} />
                <View style={styles.receitaInfo}>
                  <Text style={styles.autorNome}>{item.autor}</Text>
                  <Text style={styles.receitaData}>{item.data}</Text>
                </View>
                <Ionicons
                  name="bookmark-outline"
                  size={18}
                  color={appTheme.colors.primaryDark}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    width: 240,
    height: 240,
    borderRadius: appTheme.radius.pill,
    backgroundColor: "#FFE7D5",
    top: -110,
    right: -90,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  headerApp: {
    paddingHorizontal: 24,
    paddingBottom: 14,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.divider,
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: appTheme.radius.pill,
    backgroundColor: appTheme.colors.primaryTint,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.2,
    color: appTheme.colors.primaryDark,
    marginBottom: 10,
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
  title: {
    fontSize: 33,
    lineHeight: 39,
    color: appTheme.colors.textPrimary,
    fontWeight: "800",
    fontFamily: appTheme.typography.family,
  },
  subtitle: {
    marginTop: 12,
    color: appTheme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: appTheme.typography.family,
  },
  minorTitle: {
    fontSize: 24,
    color: appTheme.colors.textPrimary,
    fontWeight: "800",
    fontFamily: appTheme.typography.family,
  },
  recipeCounter: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
    fontFamily: appTheme.typography.family,
  },
  inputWrapper: {
    marginTop: 22,
    position: "relative",
    justifyContent: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    zIndex: 1,
  },
  input: {
    height: 50,
    backgroundColor: appTheme.colors.surfaceMuted,
    paddingLeft: 42,
    paddingRight: 16,
    borderRadius: appTheme.radius.pill,
    fontSize: 15,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    color: appTheme.colors.textPrimary,
    fontFamily: appTheme.typography.family,
  },
  inputFocused: {
    borderColor: appTheme.colors.primary,
    borderWidth: 1.5,
  },
  cardView: {
    marginTop: 22,
  },
  sectionLabel: {
    marginBottom: 12,
    marginLeft: 24,
    fontSize: 18,
    color: appTheme.colors.textPrimary,
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
  categoryList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  cardShadow: {
    borderRadius: appTheme.radius.md,
    ...appTheme.shadows.soft,
  },
  card: {
    width: 174,
    height: 102,
    justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: appTheme.radius.md,
    padding: 12,
  },
  cardText: {
    color: appTheme.colors.white,
    fontWeight: "800",
    fontSize: 14,
    lineHeight: 18,
    width: "90%",
    fontFamily: appTheme.typography.family,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(35, 27, 22, 0.38)",
    borderRadius: appTheme.radius.md,
  },
  recipeHeader: {
    marginTop: 30,
    marginBottom: 14,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  receitaCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: appTheme.colors.surface,
    borderRadius: appTheme.radius.lg,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    overflow: "hidden",
    ...appTheme.shadows.soft,
  },
  receitaImagem: {
    width: "100%",
    height: 190,
  },
  receitaBody: {
    padding: 14,
  },
  recipeBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  categoryPill: {
    backgroundColor: appTheme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    borderRadius: appTheme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryPillText: {
    color: appTheme.colors.primaryDark,
    fontSize: 12,
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF8E1",
    borderRadius: appTheme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ratingText: {
    color: "#8A5200",
    fontWeight: "700",
    fontSize: 12,
    fontFamily: appTheme.typography.family,
  },
  receitaNome: {
    fontSize: 20,
    fontWeight: "800",
    color: appTheme.colors.textPrimary,
    marginBottom: 10,
    fontFamily: appTheme.typography.family,
  },
  receitaFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
    gap: 12,
  },
  autorAvatar: {
    width: 42,
    height: 42,
    borderRadius: appTheme.radius.pill,
    borderWidth: 1,
    borderColor: appTheme.colors.primary,
    backgroundColor: appTheme.colors.primaryTint,
  },
  receitaInfo: {
    flex: 1,
  },
  autorNome: {
    fontSize: 14,
    fontWeight: "700",
    color: appTheme.colors.textPrimary,
    fontFamily: appTheme.typography.family,
  },
  receitaData: {
    fontSize: 12,
    color: appTheme.colors.textSecondary,
    fontFamily: appTheme.typography.family,
  },
});
