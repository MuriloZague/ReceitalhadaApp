import { RootStackParamList } from "@/app/(tabs)";
import { appTheme } from "@/src/styles/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Recipe } from "../models/Recipe";
import { auth } from "../services/connectionFirebase";
import { recipeService } from "../services/recipesService";

type NavProp = StackNavigationProp<RootStackParamList, "EditRecipeScreen">;
type EditRecipeRouteProp = RouteProp<RootStackParamList, "EditRecipeScreen">;

export default function EditRecipeScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<EditRecipeRouteProp>();
  const { recipe } = route.params;

  const [recipeName, setRecipeName] = useState(recipe.recipeName || "");
  const [category, setCategory] = useState(recipe.category || "");
  const [prepTime, setPrepTime] = useState(
    recipe.prepTime ? String(recipe.prepTime) : "",
  );
  const [ingredients, setIngredients] = useState(recipe.ingredients || "");
  const [instructions, setInstructions] = useState(recipe.instructions || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const finalRecipeName = recipeName.trim();
    const finalCategory = category.trim();
    const finalPrepTime = prepTime.trim();
    const finalIngredients = ingredients.trim();
    const finalInstructions = instructions.trim();

    if (!finalRecipeName) {
      newErrors.recipeName = "Nome da receita e obrigatorio.";
    }
    if (!finalCategory) {
      newErrors.category = "Categoria e obrigatoria.";
    }
    if (!finalIngredients) {
      newErrors.ingredients = "Ingredientes sao obrigatorios.";
    }
    if (!finalInstructions) {
      newErrors.instructions = "Modo de preparo e obrigatorio.";
    }

    if (!finalPrepTime) {
      newErrors.prepTime = "Tempo de preparo e obrigatorio.";
    } else if (Number.isNaN(Number(finalPrepTime))) {
      newErrors.prepTime = "Tempo de preparo deve ser numerico.";
    } else if (Number(finalPrepTime) <= 0) {
      newErrors.prepTime = "Tempo de preparo deve ser maior que zero.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateRecipe = async () => {
    if (!validate()) return;

    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Erro", "Usuario nao autenticado.");
      return;
    }

    if (!recipe.id) {
      Alert.alert("Erro", "Receita invalida para edicao.");
      return;
    }

    setIsSubmitting(true);

    const updatedRecipe: Recipe = {
      recipeName: recipeName.trim(),
      category: category.trim(),
      prepTime: Number(prepTime.trim()),
      ingredients: ingredients.trim(),
      instructions: instructions.trim(),
    };

    try {
      await recipeService.update(user.uid, recipe.id, updatedRecipe);
      Alert.alert("Sucesso", "Receita atualizada com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch {
      Alert.alert("Erro", "Nao foi possivel atualizar a receita.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topGlow} />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.titleForm}>
              Edite sua
              <Text style={styles.titleAccent}> receita</Text>
            </Text>
            <Text style={styles.subtitleForm}>
              Atualize os campos da receita para manter suas informacoes sempre
              corretas.
            </Text>

            <View style={styles.formContent}>
              <Text style={styles.labelText}>Nome da Receita</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="restaurant-outline"
                  size={18}
                  color={appTheme.colors.textMuted}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Bolo de Cenoura"
                  placeholderTextColor={appTheme.colors.textMuted}
                  value={recipeName}
                  onChangeText={(text) => {
                    setRecipeName(text);
                    if (errors.recipeName) {
                      setErrors((prev) => ({ ...prev, recipeName: "" }));
                    }
                  }}
                  editable={!isSubmitting}
                />
              </View>
              {!!errors.recipeName && (
                <Text style={styles.errorText}>{errors.recipeName}</Text>
              )}

              <Text style={styles.labelText}>Categoria</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="grid-outline"
                  size={18}
                  color={appTheme.colors.textMuted}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Doces"
                  placeholderTextColor={appTheme.colors.textMuted}
                  value={category}
                  onChangeText={(text) => {
                    setCategory(text);
                    if (errors.category) {
                      setErrors((prev) => ({ ...prev, category: "" }));
                    }
                  }}
                  editable={!isSubmitting}
                />
              </View>
              {!!errors.category && (
                <Text style={styles.errorText}>{errors.category}</Text>
              )}

              <Text style={styles.labelText}>Tempo de Preparo (min)</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="time-outline"
                  size={18}
                  color={appTheme.colors.textMuted}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 45"
                  placeholderTextColor={appTheme.colors.textMuted}
                  value={prepTime}
                  onChangeText={(text) => {
                    setPrepTime(text);
                    if (errors.prepTime) {
                      setErrors((prev) => ({ ...prev, prepTime: "" }));
                    }
                  }}
                  keyboardType="number-pad"
                  editable={!isSubmitting}
                />
              </View>
              {!!errors.prepTime && (
                <Text style={styles.errorText}>{errors.prepTime}</Text>
              )}

              <Text style={styles.labelText}>Ingredientes</Text>
              <View style={[styles.inputContainer, styles.textAreaContainer]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Ex: 2 cenouras, 3 ovos, 2 xicaras de farinha..."
                  placeholderTextColor={appTheme.colors.textMuted}
                  value={ingredients}
                  onChangeText={(text) => {
                    setIngredients(text);
                    if (errors.ingredients) {
                      setErrors((prev) => ({ ...prev, ingredients: "" }));
                    }
                  }}
                  editable={!isSubmitting}
                  multiline
                  textAlignVertical="top"
                />
              </View>
              {!!errors.ingredients && (
                <Text style={styles.errorText}>{errors.ingredients}</Text>
              )}

              <Text style={styles.labelText}>Modo de Preparo</Text>
              <View style={[styles.inputContainer, styles.textAreaContainer]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Descreva o passo a passo da receita"
                  placeholderTextColor={appTheme.colors.textMuted}
                  value={instructions}
                  onChangeText={(text) => {
                    setInstructions(text);
                    if (errors.instructions) {
                      setErrors((prev) => ({ ...prev, instructions: "" }));
                    }
                  }}
                  editable={!isSubmitting}
                  multiline
                  textAlignVertical="top"
                />
              </View>
              {!!errors.instructions && (
                <Text style={styles.errorText}>{errors.instructions}</Text>
              )}

              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  isSubmitting && styles.submitBtnDisabled,
                ]}
                activeOpacity={0.8}
                onPress={handleUpdateRecipe}
                disabled={isSubmitting}
              >
                <Text style={styles.submitBtnText}>
                  {isSubmitting ? "Salvando..." : "Salvar Alteracoes"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.goBackButton}
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.goBackText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    top: -115,
    left: -100,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
  },

  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: appTheme.colors.primaryTint,
    borderRadius: appTheme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  headerBadgeText: {
    color: appTheme.colors.primaryDark,
    fontSize: 12,
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 28,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    borderRadius: appTheme.radius.lg,
    backgroundColor: appTheme.colors.surface,
    padding: 20,
    ...appTheme.shadows.soft,
  },
  titleForm: {
    fontSize: 29,
    color: appTheme.colors.textPrimary,
    fontWeight: "800",
    fontFamily: appTheme.typography.family,
  },
  titleAccent: {
    color: appTheme.colors.primary,
  },
  subtitleForm: {
    marginTop: 10,
    marginBottom: 20,
    color: appTheme.colors.textSecondary,
    lineHeight: 22,
    fontSize: 15,
    fontFamily: appTheme.typography.family,
  },
  formContent: {
    gap: 8,
  },
  labelText: {
    fontSize: 13,
    color: appTheme.colors.textSecondary,
    fontWeight: "700",
    letterSpacing: 0.2,
    fontFamily: appTheme.typography.family,
  },
  errorText: {
    color: "#D92D20",
    fontSize: 12,
    marginBottom: 6,
    fontFamily: appTheme.typography.family,
  },
  inputContainer: {
    minHeight: 52,
    backgroundColor: appTheme.colors.surfaceMuted,
    borderRadius: appTheme.radius.sm,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  input: {
    flex: 1,
    color: appTheme.colors.textPrimary,
    fontSize: 15,
    fontFamily: appTheme.typography.family,
    paddingVertical: 14,
  },
  textAreaContainer: {
    minHeight: 130,
    alignItems: "flex-start",
    paddingTop: 8,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: "top",
    paddingTop: 8,
  },
  submitBtn: {
    backgroundColor: appTheme.colors.primary,
    minHeight: 52,
    borderRadius: appTheme.radius.sm,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    ...appTheme.shadows.strong,
  },
  submitBtnDisabled: {
    opacity: 0.75,
  },
  submitBtnText: {
    fontSize: 16,
    color: appTheme.colors.white,
    fontWeight: "800",
    textAlign: "center",
    fontFamily: appTheme.typography.family,
  },
  goBackButton: {
    marginTop: 10,
    alignItems: "center",
  },
  goBackText: {
    color: appTheme.colors.primaryDark,
    textDecorationLine: "underline",
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
});
