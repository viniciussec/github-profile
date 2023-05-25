import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { User } from "./Home";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Followers({ navigation, route }: any) {
  const { user }: { user: User } = route.params;

  const [followers, setFollowers] = useState<User[]>([]);

  async function loadFollowers() {
    const response = await fetch(user.followers_url);

    setFollowers(await response.json());
  }

  useEffect(() => {
    loadFollowers();
  }, []);

  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.followersList}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backIcon}
            >
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Seguidores</Text>
            {followers?.map((follower, index) => (
              <TouchableOpacity
                onPress={() => navigation.push("Home", { user: follower })}
                key={index}
                style={[
                  styles.card,
                  {
                    borderBottomEndRadius:
                      index === followers.length - 1 ? 20 : 0,
                  },
                  {
                    borderBottomStartRadius:
                      index === followers.length - 1 ? 20 : 0,
                  },
                ]}
              >
                <Image
                  style={styles.image}
                  source={{ uri: follower.avatar_url }}
                />
                <Text style={styles.login}>{follower.login}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    paddingHorizontal: 15,
    borderTopWidth: 2,
    gap: 20,
    width: "100%",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  followersList: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "white",
    marginBottom: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 20,
  },
  login: {
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    color: "#555",
  },
  backIcon: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  scrollView: {
    height: "100%",
    backgroundColor: "#f7f8fc",
  },
});
