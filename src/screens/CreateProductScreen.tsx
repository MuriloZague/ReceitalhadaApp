import { AppTabParamList } from "@/app/(tabs)";
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

    //try {
    //  const recipesRef = ref(database, `users/${user.uid}/recipes`);

    //  await push(recipesRef, {
    //    nomeReceita: finalRecipeName,
    //    categoria: finalCategory,
    //    tempoPreparo: prepTimeValue,
    //    porcoes: servingsValue,
    //    ingredientes: finalIngredients,
    //    modoPreparo: finalInstructions,
    //    createdAt: new Date().toISOString(),
    //  });

    //  Alert.alert("Sucesso", "Receita cadastrada com sucesso!");

      // limpa os campos
    //  setRecipeName("");
    //  setCategory("");
    //  setPrepTime("");
    //  setIngredients("");
    //  setInstructions("");
    //} catch (error) {
    //  console.log(error);
    //  Alert.alert("Erro", "Não foi possível salvar a receita.");
    //} finally {
    //  setIsSubmitting(false);
    //}
  //};

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
  <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.headerApp}>
      <Image
        style={{ width: 155, height: 30 }}
        source={require("../../assets/images/logoReceitalhada.png")}
      />
    </View>

    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <View style={styles.boxTitleForm}>
              <Text style={styles.titleForm}>
                Nova <Text style={{ color: "#E96B35" }}>Receita</Text>
              </Text>
            </View>

            <View style={styles.formContent}>
              <Text style={styles.labelText}>Nome da Receita</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Bolo de Cenoura"
                value={recipeName}
                onChangeText={setRecipeName}
                editable={!isSubmitting}
              />

              <Text style={styles.labelText}>Categoria</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Doces"
                value={category}
                onChangeText={setCategory}
                editable={!isSubmitting}
              />

              <Text style={styles.labelText}>Tempo de Preparo (min)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 45"
                value={prepTime}
                onChangeText={setPrepTime}
                keyboardType="number-pad"
                editable={!isSubmitting}
              />

              <Text style={styles.labelText}>Ingredientes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ex: 2 cenouras, 3 ovos, 2 xícaras de farinha..."
                value={ingredients}
                onChangeText={setIngredients}
                editable={!isSubmitting}
                multiline
                textAlignVertical="top"
              />

              <Text style={styles.labelText}>Modo de Preparo</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descreva o passo a passo da receita"
                value={instructions}
                onChangeText={setInstructions}
                editable={!isSubmitting}
                multiline
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  isSubmitting && styles.submitBtnDisabled,
                ]}
                activeOpacity={0.7}
                onPress={handleCreateRecipe}
                disabled={isSubmitting}
              >
                <Text style={styles.submitBtnText}>
                  {isSubmitting ? "Salvando..." : "Cadastrar Receita"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.goToHomeButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("InitialScreen")}
              >
                <Text style={styles.goToHomeText}>Voltar para Inicio</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  headerApp: {
    paddingHorizontal: 30,
    paddingBottom: 21,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 8,
    borderBottomColor: "#E96B35",
  },
  formContainer: {
    marginHorizontal: 18,
    marginTop: 40,
    borderWidth: 2,
    borderColor: "#E96B35",
    borderRadius: 16,
  },
  form: {
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  boxTitleForm: {
    borderBottomWidth: 2,
    borderBottomColor: "#E96B35",
  },
  titleForm: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 5,
    fontFamily: "Inter-Regular",
  },
  formContent: {
    paddingTop: 20,
    paddingBottom: 8,
  },
  labelText: {
    fontSize: 16.5,
    fontWeight: "500",
    fontFamily: "Inter-Regular",
  },
  input: {
    backgroundColor: "#dfdfdf",
    borderRadius: 4,
    marginBottom: 12,
    paddingLeft: 10,
    paddingVertical: 8.5,
    fontFamily: "Inter-Regular",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 10,
  },
  submitBtn: {
    backgroundColor: "#E96B35",
    padding: 10,
    marginTop: 12,
    borderRadius: 4,
  },
  submitBtnDisabled: {
    backgroundColor: "#f0a882",
  },
  submitBtnText: {
    fontSize: 17,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
  goToHomeButton: {
    marginTop: 14,
    alignItems: "center",
  },
  goToHomeText: {
    color: "#E96B35",
    textDecorationLine: "underline",
    fontFamily: "Inter-Regular",
  },
});
