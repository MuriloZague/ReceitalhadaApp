import { Recipe } from "@/src/models/Recipe";
import DashboardScreen from "@/src/screens/Dashboard";
import HomeScreen from "@/src/screens/Home";
import InitialScreen from "@/src/screens/InitialScreen";
import LoginScreen from "@/src/screens/LoginScreen";
import RegisterScreen from "@/src/screens/RegisterScreen";
import { appTheme } from "@/src/styles/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateProductScreen from "../../src/screens/CreateProductScreen";
import EditRecipeScreen from "../../src/screens/EditRecipeScreen";
import UserRecipesModalScreen from "../../src/screens/UserRecipesModalScreen";

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  AppTabs: NavigatorScreenParams<AppTabParamList>;
  UserRecipesModalScreen: undefined;
  EditRecipeScreen: { recipe: Recipe };
};

export type AppTabParamList = {
  InitialScreen: undefined;
  CreateProductScreen: undefined;
  DashBoardScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();

function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="InitialScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneStyle: {
          backgroundColor: appTheme.colors.background,
        },
        tabBarActiveTintColor: appTheme.colors.primary,
        tabBarInactiveTintColor: appTheme.colors.textMuted,
        tabBarStyle: {
          position: "absolute",
          height: 70,
          left: 14,
          right: 14,
          bottom: 12,
          borderTopWidth: 0,
          borderRadius: appTheme.radius.lg,
          backgroundColor: appTheme.colors.surface,
          paddingBottom: 10,
          paddingTop: 8,
          ...appTheme.shadows.strong,
          marginHorizontal: 12,
        },
        tabBarLabelStyle: {
          fontFamily: appTheme.typography.family,
          fontSize: 11,
          fontWeight: "700",
        },
        tabBarItemStyle: {
          marginHorizontal: 6,
          borderRadius: appTheme.radius.md,
        },
        tabBarIcon: ({ color, size, focused }) => {
          const iconName =
            route.name === "InitialScreen"
              ? focused
                ? "home"
                : "home-outline"
              : route.name === "CreateProductScreen"
                ? focused
                  ? "restaurant"
                  : "restaurant-outline"
                : focused
                  ? "person"
                  : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{ tabBarLabel: "Inicio" }}
      />
      <Tab.Screen
        name="CreateProductScreen"
        component={CreateProductScreen}
        options={{ tabBarLabel: "Receita" }}
      />
      <Tab.Screen
        name="DashBoardScreen"
        component={DashboardScreen}
        options={{ tabBarLabel: "Conta" }}
      />
    </Tab.Navigator>
  );
}

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      <Stack.Screen name="AppTabs" component={AppTabs} />

      <Stack.Screen
        name="UserRecipesModalScreen"
        component={UserRecipesModalScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Receitas Criadas",
          headerStyle: {
            backgroundColor: appTheme.colors.surface,
          },
          headerTintColor: appTheme.colors.primaryDark,
          headerTitleStyle: {
            color: appTheme.colors.textPrimary,
            fontFamily: appTheme.typography.family,
            fontWeight: "700",
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="EditRecipeScreen"
        component={EditRecipeScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Editar Receita",
          headerStyle: {
            backgroundColor: appTheme.colors.surface,
          },
          headerTintColor: appTheme.colors.primaryDark,
          headerTitleStyle: {
            color: appTheme.colors.textPrimary,
            fontFamily: appTheme.typography.family,
            fontWeight: "700",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
