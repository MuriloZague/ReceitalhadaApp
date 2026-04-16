import { Image } from "expo-image";
import {  push, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, database } from "../services/connectionFirebase";

type UserRecipe = {
  id: string;
  nomeReceita: string;
  categoria: string;
  tempoPreparo: string;
  modoPreparo: string;
  ingredientes: string;
};

export default function UserRecipesModalScreen() {
  const [recipes, setRecipes] = useState<UserRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      setIsLoading(false);
      return;
    }

    const recipesRef = ref(database, `users/${user.uid}/recipes`);

    const unsubscribe = onValue(recipesRef, (snapshot) => {
      if (!snapshot.exists()) {
        setRecipes([]);
        setIsLoading(false);
        return;
      }

      const data = snapshot.val() as Record<string, Partial<UserRecipe>>;
      const formattedRecipes: UserRecipe[] = Object.entries(data).map(
        ([id, recipe]) => ({
          id,
          nomeReceita: recipe.nomeReceita || "Sem titulo",
          categoria: recipe.categoria || "Sem categoria",
          tempoPreparo: recipe.tempoPreparo || "-",
          modoPreparo: recipe.modoPreparo || "-",
          ingredientes: recipe.ingredientes || "-",
        }),
      );

      setRecipes(formattedRecipes);
      console.log(formattedRecipes)
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logoReceitalhada.png")}
          />
          <Text style={styles.bannerText}>
            Aqui aparecem as receitas criadas por você
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="small" color="#E96B35" />
            <Text style={styles.stateText}>Carregando receitas...</Text>
          </View>
        ) : recipes.length === 0 ? (
          <View style={styles.centerState}>
            <Text style={styles.emptyTitle}>Nenhuma receita criada ainda</Text>
            <Text style={styles.emptyText}>
              Use a aba Receita para cadastrar sua primeira receita.
            </Text>
          </View>
        ) : (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.recipeCard}>
                <Text style={styles.recipeTitle}>{item.nomeReceita}</Text>
                <Text style={styles.recipeMeta}>
                  Categoria: {item.categoria}
                </Text>
                <Text style={styles.recipeMeta}>
                  Tempo de preparo: {item.tempoPreparo} min
                </Text>
                <Text style={styles.recipeMeta}>
                  Ingredientes: {item.ingredientes} min
                </Text>
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
    backgroundColor: "#FAFAFA",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
  },
  banner: {
    borderWidth: 1.5,
    borderColor: "#E96B35",
    borderRadius: 14,
    backgroundColor: "#FFF7F2",
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16,
  },
  logo: {
    width: 130,
    height: 26,
    marginBottom: 8,
  },
  bannerText: {
    color: "#A0552B",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "Inter-Regular",
  },
  listContent: {
    paddingBottom: 16,
    gap: 12,
  },
  recipeCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EED0C1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#E96B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeTitle: {
    fontSize: 17,
    color: "#1A1A1A",
    fontWeight: "700",
    marginBottom: 6,
    fontFamily: "Inter-Regular",
  },
  recipeMeta: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
    fontFamily: "Inter-Regular",
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  stateText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    fontFamily: "Inter-Regular",
  },
  emptyTitle: {
    fontSize: 18,
    color: "#1A1A1A",
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
});
