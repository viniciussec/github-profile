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

type Organization = {
  login: string;
  avatar_url: string;
  description: string;
};

export default function Organizations({ navigation, route }: any) {
  const { user }: { user: User } = route.params;

  const [organizations, setOrganizations] = useState<Organization[]>();

  async function loadOrganizations() {
    const response = await fetch(user.organizations_url);

    setOrganizations(await response.json());
  }

  useEffect(() => {
    loadOrganizations();
  }, []);

  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.organizationsList}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backIcon}
            >
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Organizações</Text>
            {organizations == null && (
              <Text style={{ marginBottom: 20 }}>Carregando...</Text>
            )}
            {organizations?.length === 0 && (
              <Text style={{ marginBottom: 20 }}>
                O usuário não pertence a nenhuma organização
              </Text>
            )}
            {organizations?.map((organization, index) => (
              <View
                key={index}
                style={[
                  styles.card,
                  {
                    borderBottomEndRadius:
                      index === organizations.length - 1 ? 20 : 0,
                  },
                  {
                    borderBottomStartRadius:
                      index === organizations.length - 1 ? 20 : 0,
                  },
                ]}
              >
                <Image
                  style={styles.image}
                  source={{ uri: organization.avatar_url }}
                ></Image>
                <Text style={styles.login}>{organization.login}</Text>
                <Text style={styles.description}>
                  {organization.description}
                </Text>
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
  organizationsList: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "white",
    marginVertical: 50,
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
    backgroundColor: "#f7f8fc",
    height: "100%",
  },
});
