import HomeScreen from "@/src/screens/Home";
import RegisterPage from "@/src/screens/RegisterPage"
import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen name="RegisterScreen" component={RegisterPage} />
    </Stack.Navigator>
  );
}
