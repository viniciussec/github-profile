import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bio from "./screens/Bio";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Bio"
          component={Bio}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
