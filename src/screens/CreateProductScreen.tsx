import { AppTabParamList } from "@/app/(tabs)";
import { appTheme } from "@/src/styles/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
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
import { auth } from "../services/connectionFirebase";

type NavProp = BottomTabNavigationProp<AppTabParamList, "CreateProductScreen">;

export default function CreateProductScreen() {
  const navigation = useNavigation<NavProp>();

  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateRecipe = () => {
    const finalRecipeName = recipeName.trim();
    const finalCategory = category.trim();
    const finalPrepTime = prepTime.trim();
    const finalIngredients = ingredients.trim();
    const finalInstructions = instructions.trim();

    if (
      !finalRecipeName ||
      !finalCategory ||
      !finalPrepTime ||
      !finalIngredients ||
      !finalInstructions
    ) {
      Alert.alert("Atenção", "Preencha todos os campos da receita.");
      return;
    }

    const prepTimeValue = Number(finalPrepTime);

    if (Number.isNaN(prepTimeValue) || prepTimeValue <= 0) {
      Alert.alert("Atenção", "Informe um tempo de preparo válido em minutos.");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    setIsSubmitting(true);

    // Estrutura mantida como mock ate a integracao final com o Firebase.
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert("Sucesso", "Receita cadastrada com sucesso!");
      setRecipeName("");
      setCategory("");
      setPrepTime("");
      setIngredients("");
      setInstructions("");
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topGlow} />

      <View style={styles.headerApp}>
        <Image
          style={{ width: 155, height: 30 }}
          source={require("../../assets/images/logoReceitalhada.png")}
        />

        <View style={styles.headerBadge}>
          <Ionicons name="sparkles-outline" size={14} color="#D4550B" />
          <Text style={styles.headerBadgeText}>Criar</Text>
        </View>
      </View>

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
              Publique sua
              <Text style={styles.titleAccent}> nova receita</Text>
            </Text>
            <Text style={styles.subtitleForm}>
              Compartilhe ingredientes, preparo e tempo para inspirar outras
              pessoas na cozinha.
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
                  onChangeText={setRecipeName}
                  editable={!isSubmitting}
                />
              </View>

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
                  onChangeText={setCategory}
                  editable={!isSubmitting}
                />
              </View>

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
                  onChangeText={setPrepTime}
                  keyboardType="number-pad"
                  editable={!isSubmitting}
                />
              </View>

              <Text style={styles.labelText}>Ingredientes</Text>
              <View style={[styles.inputContainer, styles.textAreaContainer]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Ex: 2 cenouras, 3 ovos, 2 xicaras de farinha..."
                  placeholderTextColor={appTheme.colors.textMuted}
                  value={ingredients}
                  onChangeText={setIngredients}
                  editable={!isSubmitting}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <Text style={styles.labelText}>Modo de Preparo</Text>
              <View style={[styles.inputContainer, styles.textAreaContainer]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Descreva o passo a passo da receita"
                  placeholderTextColor={appTheme.colors.textMuted}
                  value={instructions}
                  onChangeText={setInstructions}
                  editable={!isSubmitting}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  isSubmitting && styles.submitBtnDisabled,
                ]}
                activeOpacity={0.8}
                onPress={handleCreateRecipe}
                disabled={isSubmitting}
              >
                <Text style={styles.submitBtnText}>
                  {isSubmitting ? "Salvando..." : "Cadastrar Receita"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.goToHomeButton}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("InitialScreen")}
              >
                <Text style={styles.goToHomeText}>Voltar para inicio</Text>
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
  headerApp: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.divider,
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
  goToHomeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  goToHomeText: {
    color: appTheme.colors.primaryDark,
    textDecorationLine: "underline",
    fontWeight: "700",
    fontFamily: appTheme.typography.family,
  },
});
