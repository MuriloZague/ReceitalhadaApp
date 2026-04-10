import DashboardScreen from "@/src/screens/Dashboard";
import HomeScreen from "@/src/screens/Home";
import InitialScreen from "@/src/screens/InitialScreen";
import LoginScreen from "@/src/screens/LoginScreen";
import RegisterScreen from "@/src/screens/RegisterScreen";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  AppTabs: NavigatorScreenParams<AppTabParamList>;
};

export type AppTabParamList = {
  InitialScreen: undefined;
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
        tabBarActiveTintColor: "#E96B35",
        tabBarInactiveTintColor: "#9B9B9B",
        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
          backgroundColor: "#FFFFFF",
        },
        tabBarLabelStyle: {
          fontFamily: "Inter-Regular",
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === "InitialScreen" ? "home-outline" : "person-outline";
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
    </Stack.Navigator>
  );
}
