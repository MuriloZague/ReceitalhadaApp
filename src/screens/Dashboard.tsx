import { AppTabParamList, RootStackParamList } from "@/app/(tabs)";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, database } from "../services/connectionFirebase";

const { width } = Dimensions.get("window");

type NavProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, "DashBoardScreen">,
  StackNavigationProp<RootStackParamList>
>;

export default function DashboardScreen() {
  const navigation = useNavigation<NavProp>();
  const [userData, setUserData] = useState({
    nome: "Carregando...",
    telefone: "Carregando...",
  });
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `users/${user.uid}`);

      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData({
            nome: data.name || "N/A",
            telefone: data.cellphone || "N/A",
          });
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const handleToggleEdit = () => {
    if (isSaving) {
      return;
    }

    if (isEditing) {
      setName("");
      setCellphone("");
      setIsEditing(false);
      return;
    }

    setName(userData.nome === "N/A" ? "" : userData.nome);
    setCellphone(userData.telefone === "N/A" ? "" : userData.telefone);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!isEditing || isSaving) {
      return;
    }

    const finalName = name.trim();
    const finalCellphone = cellphone.trim();

    if (!finalName || !finalCellphone) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    setIsSaving(true);

    try {
      await update(ref(database, `users/${user.uid}`), {
        name: finalName,
        cellphone: finalCellphone,
        updatedAt: new Date().toISOString(),
      });

      setUserData({
        nome: finalName,
        telefone: finalCellphone,
      });
      setName("");
      setCellphone("");
      setIsEditing(false);

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    const parentNavigation =
      navigation.getParent<StackNavigationProp<RootStackParamList>>();

    if (parentNavigation) {
      parentNavigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    }
  };

  const handleOpenMyRecipes = () => {
    const parentNavigation =
      navigation.getParent<StackNavigationProp<RootStackParamList>>();

    if (parentNavigation) {
      parentNavigation.navigate("UserRecipesModalScreen");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <View style={styles.header}>
        <Image
          style={{ width: 155, height: 30 }}
          source={require("../../assets/images/logoReceitalhada.png")}
        />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("InitialScreen")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={16} color="#888" />
          <Text style={{ fontSize: 16, fontFamily: "Inter-Regular" }}>
            Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.pageTitle}>Minha Conta</Text>

        <View style={styles.section}>
          <Image
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
              marginBottom: 26,
            }}
            source={require("../../assets/images/profile-icon.svg")}
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meus Dados:</Text>
            <TouchableOpacity
              style={[styles.editButton, isSaving && styles.editButtonDisabled]}
              activeOpacity={0.8}
              onPress={handleToggleEdit}
              disabled={isSaving}
            >
              <Text style={styles.editButtonText}>
                {isEditing ? "Cancelar" : "Editar"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={isEditing ? name : userData.nome}
              onChangeText={setName}
              editable={isEditing && !isSaving}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Telefone</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={isEditing ? cellphone : userData.telefone}
              onChangeText={setCellphone}
              editable={isEditing && !isSaving}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minhas Receitas:</Text>

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={handleOpenMyRecipes}
          >
            <Ionicons
              name="restaurant-outline"
              size={20}
              color="#E96B35"
              style={styles.actionIcon}
            />
            <Text style={styles.actionButtonText}>
              Acessar Receitas Criadas
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#E96B35" />
          </TouchableOpacity>
        </View>

        {isEditing && (
          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            activeOpacity={0.8}
            onPress={handleUpdate}
            disabled={isSaving}
          >
            {isSaving ? (
              <View style={styles.saveButtonContent}>
                <ActivityIndicator size="small" color="#E96B35" />
                <Text style={styles.saveButtonText}>Salvando...</Text>
              </View>
            ) : (
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderBottomWidth: 8,
    borderBottomColor: "#E96B35",
    paddingBottom: 21,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E96B35",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#E96B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconButtonGray: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cartIcon: {
    fontSize: 24,
  },
  orangeDivider: {
    height: 6,
    backgroundColor: "#E96B35",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  backButton: {
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 26,
    fontFamily: "Inter-Regular",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1A1A1A",
    marginBottom: 0,
    fontFamily: "Inter-Regular",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  editButton: {
    borderWidth: 1,
    borderColor: "#E96B35",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#FFF7F2",
  },
  editButtonText: {
    color: "#E96B35",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Inter-Regular",
  },
  editButtonDisabled: {
    opacity: 0.65,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888",
    marginBottom: 8,
    letterSpacing: 0.2,
    fontFamily: "Inter-Regular",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: "500",
    color: "#1A1A1A",
    fontFamily: "Inter-Regular",
  },
  inputDisabled: {
    backgroundColor: "#F6F6F6",
    color: "#8C8C8C",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E96B35",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 14,
    shadowColor: "#E96B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 22,
    marginRight: 14,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E96B35",
    flex: 1,
    fontFamily: "Inter-Regular",
  },
  logoutButton: {
    backgroundColor: "#E96B35",
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: "#E96B35",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  logoutButtonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: "white",
    letterSpacing: 0.5,
    fontFamily: "Inter-Regular",
  },
  saveButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E96B35",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 14,
    shadowColor: "#E96B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  saveButtonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: "#E96B35",
    letterSpacing: 0.5,
    fontFamily: "Inter-Regular",
  },
});
