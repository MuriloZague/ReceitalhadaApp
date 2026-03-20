import HomeScreen from "@/src/screens/Home";
import RegisterScreen from "@/src/screens/RegisterScreen";
import LoginScreen from "@/src/screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
