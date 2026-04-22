import { AppTabParamList, RootStackParamList } from "@/app/(tabs)";
import { appTheme } from "@/src/styles/appTheme";
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
import { auth, database } from "../services/connectionFirebase";

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
  }, [user]);

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topGlow} />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Image
            style={{ width: 155, height: 30 }}
            source={require("../../assets/images/logoReceitalhada.png")}
          />

          <View style={styles.headerBadge}>
            <Ionicons name="person-outline" size={14} color="#D4550B" />
            <Text style={styles.headerBadgeText}>Minha conta</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("InitialScreen")}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-back"
              size={16}
              color={appTheme.colors.textSecondary}
            />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>

          <Text style={styles.pageTitle}>Minha Conta</Text>
          <Text style={styles.pageSubtitle}>
            Edite seus dados e acompanhe suas receitas publicadas.
          </Text>

          <View style={styles.profileSection}>
            <Image
              style={styles.profileImage}
              source={require("../../assets/images/profile-icon.svg")}
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Meus dados</Text>
              <TouchableOpacity
                style={[
                  styles.editButton,
                  isSaving && styles.editButtonDisabled,
                ]}
                activeOpacity={0.8}
                onPress={handleToggleEdit}
                disabled={isSaving}
              >
                <Ionicons
                  name={isEditing ? "close-outline" : "create-outline"}
                  size={14}
                  color={appTheme.colors.primaryDark}
                />
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

            {isEditing && (
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  isSaving && styles.saveButtonDisabled,
                ]}
                activeOpacity={0.8}
                onPress={handleUpdate}
                disabled={isSaving}
              >
                {isSaving ? (
                  <View style={styles.saveButtonContent}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.saveButtonText}>Salvando...</Text>
                  </View>
                ) : (
                  <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Minhas receitas</Text>

            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.8}
              onPress={handleOpenMyRecipes}
            >
              <Ionicons
                name="restaurant-outline"
                size={20}
                color={appTheme.colors.primaryDark}
                style={styles.actionIcon}
              />
              <Text style={styles.actionButtonText}>
                Acessar Receitas Criadas
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={appTheme.colors.primaryDark}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
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
    width: 250,
    height: 250,
    borderRadius: appTheme.radius.pill,
    backgroundColor: "#FFE7D5",
    top: -105,
    right: -95,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  backButton: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontSize: 15,
    color: appTheme.colors.textSecondary,
    fontFamily: appTheme.typography.family,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: appTheme.colors.textPrimary,
    marginBottom: 10,
    fontFamily: appTheme.typography.family,
  },
  pageSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: appTheme.colors.textSecondary,
    marginBottom: 24,
    fontFamily: appTheme.typography.family,
  },
  section: {
    marginBottom: 20,
    backgroundColor: appTheme.colors.surface,
    borderRadius: appTheme.radius.lg,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    padding: 18,
    ...appTheme.shadows.soft,
  },
  profileSection: {
    marginBottom: 20,
    backgroundColor: appTheme.colors.surface,
    borderRadius: appTheme.radius.lg,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    padding: 18,
    ...appTheme.shadows.soft,
  },
  profileImage: {
    width: 92,
    height: 92,
    alignSelf: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: appTheme.colors.textPrimary,
    marginBottom: 0,
    fontFamily: appTheme.typography.family,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
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
  editButtonDisabled: {
    opacity: 0.65,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: appTheme.colors.textSecondary,
    marginBottom: 7,
    letterSpacing: 0.2,
    fontFamily: appTheme.typography.family,
  },
  input: {
    backgroundColor: appTheme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    borderRadius: appTheme.radius.sm,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: "600",
    color: appTheme.colors.textPrimary,
    fontFamily: appTheme.typography.family,
  },
  inputDisabled: {
    opacity: 0.82,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: appTheme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    borderRadius: appTheme.radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 12,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: appTheme.colors.primaryDark,
    flex: 1,
    fontFamily: appTheme.typography.family,
  },
  logoutButton: {
    backgroundColor: appTheme.colors.primary,
    borderRadius: appTheme.radius.md,
    paddingVertical: 16,
    ...appTheme.shadows.strong,
  },
  logoutButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: appTheme.colors.white,
    fontFamily: appTheme.typography.family,
  },
  saveButton: {
    marginTop: 6,
    backgroundColor: appTheme.colors.primary,
    borderRadius: appTheme.radius.sm,
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    ...appTheme.shadows.strong,
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
    fontSize: 16,
    fontWeight: "800",
    color: appTheme.colors.white,
    fontFamily: appTheme.typography.family,
  },
});
