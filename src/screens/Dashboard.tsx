import { RootStackParamList } from "@/app/(tabs)";
import Waves from "@/components/waves";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
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

type NavProp = StackNavigationProp<RootStackParamList>;

export default function DashboardScreen() {
  const navigation = useNavigation<NavProp>();
  const [userData, setUserData] = useState({
    nome: "Carregando...",
    telefone: "Carregando...",
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = ref(database, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData({
              nome: data.name || "N/A",
              telefone: data.cellphone || "N/A",
            });
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    navigation.navigate("HomeScreen");
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
          onPress={() => navigation.goBack()}
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
            style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 26 }}
            source={require("../../assets/images/profile-icon.svg")}
          />
          <Text style={styles.sectionTitle}>Meus Dados:</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              value={userData.nome}
              onChangeText={(text) => setUserData({ ...userData, nome: text })}
              editable={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={userData.telefone}
              onChangeText={(text) =>
                setUserData({ ...userData, telefone: text })
              }
              editable={false}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <Waves height={100} color="#E96B35" />
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
    marginBottom: 16,
    fontFamily: "Inter-Regular",
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
});
