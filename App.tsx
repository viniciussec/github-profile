import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

type User = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export default function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch("https://api.github.com/users/viniciussec")
      .then((response) => response.json())
      .then((data) => setUser(data));
  });

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: user?.avatar_url,
          }}
          style={styles.image}
        ></Image>
        <TouchableOpacity style={styles.glass}>
          <Entypo name="magnifying-glass" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.username}>@{user?.login}</Text>
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.mainPart}>
            <View style={styles.icon}>
              <Ionicons name="person-outline" size={27} color="black" />
            </View>
            <View>
              <Text style={styles.buttonTitle}>Bio</Text>
              <Text style={styles.buttonSubtitle}>
                Um pouco sobre o usuário
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.mainPart}>
            <View style={styles.icon}>
              <FontAwesome5 name="headset" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.buttonTitle}>Orgs</Text>
              <Text style={styles.buttonSubtitle}>
                Organizações que o usuário faz parte
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.mainPart}>
            <View style={styles.icon}>
              <AntDesign name="filetext1" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.buttonTitle}>Repositórios</Text>
              <Text style={styles.buttonSubtitle}>
                Lista contendo todos os repositórios
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderBottomWidth: 0,
            },
          ]}
        >
          <View style={styles.mainPart}>
            <View style={styles.icon}>
              <AntDesign name="smileo" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.buttonTitle}>Seguidores</Text>
              <Text style={styles.buttonSubtitle}>Lista de seguidores</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetButton}>
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
});
