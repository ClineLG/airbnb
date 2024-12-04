import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";

const SubmitSign = ({ title, isLoading, handlePress, route, errorMessage }) => {
  return (
    <View style={styles.block}>
      {isLoading ? <ActivityIndicator /> : ""}
      <Text style={styles.error}>{errorMessage}</Text>
      <Pressable disabled={isLoading ? true : false} onPress={handlePress}>
        <Text style={styles.button}>{title}</Text>
      </Pressable>
      <Link href={route} style={styles.text} replace>
        Already have an account ? {title === "Sign In" ? "Sign Up" : "Sign In"}
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },

  button: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 99,
    borderColor: "red",
    borderWidth: 2,
  },
  text: {
    color: "gray",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
export default SubmitSign;
