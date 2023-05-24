import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import Button from "../components/Button";
import { NavigationProp } from "@react-navigation/native";

export type User = {
  login: string;
  avatar_url: string;
  followers_url: string;
  following_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  name: string;
  bio: string;
};

export interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

export default function Home({ navigation }: HomeScreenProps) {
  const defaultUser = {
    login: "--",
    avatar_url: "https://static.thenounproject.com/png/1014492-200.png",
    followers_url: "",
    following_url: "",
    subscriptions_url: "",
    organizations_url: "",
    repos_url: "",
    name: "--",
    bio: "",
  };

  const [user, setUser] = useState<User>(defaultUser);

  const [showInput, setShowInput] = useState(false);

  const [search, setSearch] = useState("");

  async function handleGlassPress() {
    if (!showInput) {
      setShowInput(true);
    } else if (search !== "") {
      setShowInput(false);
      const response = await fetch(`https://api.github.com/users/${search}`);
      setSearch("");
      const data = await response.json();
      setUser(data);
    } else {
      setShowInput(false);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: user?.avatar_url,
          }}
          style={styles.image}
        />
        {showInput && (
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          ></TextInput>
        )}
        <TouchableHighlight onPress={handleGlassPress} style={styles.glass}>
          <Entypo name="magnifying-glass" size={30} color="white" />
        </TouchableHighlight>
      </View>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.username}>{"@" + user?.login}</Text>
      <View style={styles.buttonSection}>
        <Button
          disabled={!user.bio}
          onPress={() => navigation.navigate("Bio", { user })}
          title="Bio"
          subtitle="Um pouco sobre o usuário"
          icon="bio"
        />
        <Button
          disabled={!user.organizations_url}
          title="Orgs"
          subtitle="Organizações que o usuário faz parte"
          icon="orgs"
        />
        <Button
          disabled={!user.repos_url}
          title="Repositórios"
          subtitle="Lista contendo todos os repositórios"
          icon="repositories"
        />
        <Button
          disabled={!user.followers_url}
          isLast
          title="Seguidores"
          subtitle="Lista de seguidores"
          icon="followers"
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => setUser(defaultUser)}
          style={styles.resetButton}
        >
          <MaterialIcons name="logout" size={24} color="black" />
          <Text>Resetar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fc",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 75,
  },
  glass: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    textShadowColor: "#585858",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    zIndex: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
    marginTop: 8,
  },
  buttonSection: {
    flexDirection: "column",
    width: "90%",
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 25,
    textShadowColor: "#585858",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    backgroundColor: "white",
    marginTop: 50,
    gap: 1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    width: "100%",
    borderColor: "thistle",
  },
  icon: {
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 10,
  },
  buttonSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 10,
    color: "gray",
  },
  mainPart: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "90%",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
  },
  footer: {
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 30,
    marginTop: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 150,
    borderWidth: 1,
    height: 40,
    bottom: 0,
    padding: 10,
    position: "absolute",
  },
});
