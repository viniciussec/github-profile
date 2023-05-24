import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { User } from "./Home";
import { Ionicons } from "@expo/vector-icons";

export default function Bio({ navigation, route }: any) {
  const { user }: { user: User } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.backIcon}
        >
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Bio</Text>
        <Image style={styles.image} source={{ uri: user.avatar_url }} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fc",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 15,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: "thistle",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 75,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 20,
  },
  bio: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
    marginTop: 8,
  },
  backIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});
