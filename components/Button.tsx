import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

type ButtonProps = {
  title: string;
  subtitle: string;
  icon: "bio" | "orgs" | "repositories" | "followers";
  isLast?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

export default function Button({
  title,
  subtitle,
  icon,
  isLast = false,
  onPress,
  disabled = false,
}: ButtonProps) {
  function getIcon(icon: ButtonProps["icon"]) {
    switch (icon) {
      case "bio":
        return <Ionicons name="person-outline" size={27} color="black" />;
      case "orgs":
        return <FontAwesome5 name="headset" size={24} color="black" />;
      case "repositories":
        return <AntDesign name="filetext1" size={24} color="black" />;
      case "followers":
        return <AntDesign name="smileo" size={24} color="black" />;
      default:
        return <AntDesign name="filetext1" size={24} color="black" />;
    }
  }

  function handlePress() {
    if (!disabled && onPress) {
      onPress();
    }
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        {
          borderBottomWidth: isLast ? 0 : 1,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={handlePress}
    >
      <View style={styles.mainPart}>
        <View style={styles.icon}>{getIcon(icon)}</View>
        <View>
          <Text style={styles.buttonTitle}>{title}</Text>
          <Text style={styles.buttonSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
