import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { User } from "./Home";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type Repository = {
  name: string;
  description: string;
};

export default function Repositories({ navigation, route }: any) {
  const { user }: { user: User } = route.params;

  const [repositories, setRepositories] = useState<Repository[]>();

  async function loadRepositories() {
    const response = await fetch(user.repos_url);

    setRepositories(await response.json());
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.repositoriesList}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backIcon}
            >
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Repositórios</Text>
            {repositories == null && (
              <Text style={{ marginBottom: 20 }}>Carregando...</Text>
            )}
            {repositories?.length === 0 && (
              <Text style={{ marginBottom: 20 }}>
                O usuário não possui nenhum repositório
              </Text>
            )}
            {repositories?.map((repository, index) => (
              <View
                key={index}
                style={[
                  styles.card,
                  {
                    borderBottomEndRadius:
                      index === repositories.length - 1 ? 20 : 0,
                  },
                  {
                    borderBottomStartRadius:
                      index === repositories.length - 1 ? 20 : 0,
                  },
                ]}
              >
                <Text style={styles.login}>{repository.name}</Text>
                <Text style={styles.description}>{repository.description}</Text>
              </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    paddingHorizontal: 15,
    borderTopWidth: 2,
    gap: 5,
    width: "100%",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  repositoriesList: {
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
