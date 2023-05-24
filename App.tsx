import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bio from "./screens/Bio";
import Organizations from "./screens/Organizations";
import Repositories from "./screens/Repositories";
import Followers from "./screens/Followers";

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
        <Stack.Screen
          options={{ headerShown: false }}
          name="Organizations"
          component={Organizations}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Repositories"
          component={Repositories}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Followers"
          component={Followers}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
