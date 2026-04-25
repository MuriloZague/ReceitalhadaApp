import { RootStackParamList } from "@/app/(tabs)";
import { appTheme } from "@/src/styles/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Recipe } from "../models/Recipe";
import { auth } from "../services/connectionFirebase";
import { recipeService } from "../services/recipesService";

type NavProp = StackNavigationProp<RootStackParamList>;

export default function UserRecipesModalScreen() {
  const navigation = useNavigation<NavProp>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProducts = async () => {
    const user = auth.currentUser;

    if (!user) {
      setRecipes([]);
      setIsLoading(false);
      return;
    }

    const data = await recipeService.getAll(user.uid);
    setRecipes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEditRecipe = (recipe: Recipe) => {
    navigation.navigate("EditRecipeScreen", { recipe });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topGlow} />

      <View style={styles.container}>
        <View style={styles.banner}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logoReceitalhada.png")}
          />
          <Text style={styles.bannerText}>
            Aqui aparecem as receitas criadas por você
          </Text>

          <View style={styles.bannerInfoPill}>
            <Ionicons
              name="document-text-outline"
              size={13}
              color={appTheme.colors.primaryDark}
            />
            <Text style={styles.bannerInfoText}>
              {recipes.length} receita(s) registrada(s)
            </Text>
          </View>
        </View>

        {isLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="small" color={appTheme.colors.primary} />
            <Text style={styles.stateText}>Carregando receitas...</Text>
          </View>
        ) : recipes.length === 0 ? (
          <View style={styles.centerState}>
            <Ionicons
              name="restaurant-outline"
              size={30}
              color={appTheme.colors.textMuted}
            />
            <Text style={styles.emptyTitle}>Nenhuma receita criada ainda</Text>
            <Text style={styles.emptyText}>
              Use a aba Receita para cadastrar sua primeira receita.
            </Text>
          </View>
        ) : (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id!}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.recipeCard}>
                <Text style={styles.recipeTitle}>{item.recipeName}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaPill}>
                    <Ionicons
                      name="layers-outline"
                      size={13}
                      color={appTheme.colors.primaryDark}
                    />
                    <Text style={styles.metaPillText}>{item.category}</Text>
                  </View>
                  <View style={styles.metaPill}>
                    <Ionicons
                      name="time-outline"
                      size={13}
                      color={appTheme.colors.primaryDark}
                    />
                    <Text style={styles.metaPillText}>{item.prepTime} min</Text>
                  </View>
                </View>

                <Text style={styles.recipeMetaLabel}>Ingredientes</Text>
                <Text style={styles.recipeMeta}>{item.ingredients}</Text>

                <Text style={styles.recipeMetaLabel}>Modo de preparo</Text>
                <Text numberOfLines={3} style={styles.recipeMeta}>
                  {item.instructions}
                </Text>

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.editButton}
                    activeOpacity={0.8}
                    onPress={() => handleEditRecipe(item)}
                  >
                    <Ionicons
                      name="create-outline"
                      size={14}
                      color={appTheme.colors.primaryDark}
                    />
                    <Text style={styles.editButtonText}>Editar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
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
    width: 220,
    height: 220,
    borderRadius: appTheme.radius.pill,
    backgroundColor: "#FFE7D5",
    top: -90,
    left: -90,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 22,
  },
  banner: {
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    borderRadius: appTheme.radius.lg,
    backgroundColor: appTheme.colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16,
    ...appTheme.shadows.soft,
  },
  logo: {
    width: 130,
    height: 26,
    marginBottom: 8,
  },
  bannerText: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
    fontFamily: appTheme.typography.family,
  },
  bannerInfoPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: appTheme.colors.primaryTint,
    borderRadius: appTheme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  bannerInfoText: {
    color: appTheme.colors.primaryDark,
    fontWeight: "700",
    fontSize: 12,
    fontFamily: appTheme.typography.family,
  },
  listContent: {
    paddingBottom: 18,
    gap: 12,
  },
  recipeCard: {
    backgroundColor: appTheme.colors.surface,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    borderRadius: appTheme.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 14,
    ...appTheme.shadows.soft,
  },
  recipeTitle: {
    fontSize: 19,
    color: appTheme.colors.textPrimary,
    fontWeight: "800",
    marginBottom: 10,
    fontFamily: appTheme.typography.family,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: appTheme.radius.pill,
    backgroundColor: appTheme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
  },
  metaPillText: {
    color: appTheme.colors.primaryDark,
    fontSize: 12,
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
  recipeMetaLabel: {
    fontSize: 12,
    color: appTheme.colors.textMuted,
    marginBottom: 4,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    fontFamily: appTheme.typography.family,
  },
  recipeMeta: {
    fontSize: 14,
    color: appTheme.colors.textSecondary,
    marginBottom: 10,
    lineHeight: 20,
    fontFamily: appTheme.typography.family,
  },
  actionsRow: {
    flexDirection: "row",
    marginTop: 2,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1.2,
    borderColor: appTheme.colors.primary,
    borderRadius: appTheme.radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: appTheme.colors.primaryTint,
  },
  editButtonText: {
    color: appTheme.colors.primaryDark,
    fontSize: 13,
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 8,
  },
  stateText: {
    fontSize: 14,
    color: appTheme.colors.textSecondary,
    fontFamily: appTheme.typography.family,
  },
  emptyTitle: {
    fontSize: 18,
    color: appTheme.colors.textPrimary,
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center",
    fontFamily: appTheme.typography.family,
  },
  emptyText: {
    fontSize: 14,
    color: appTheme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: appTheme.typography.family,
  },
});
