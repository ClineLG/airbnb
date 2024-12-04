import { Text, View, Button, StyleSheet } from "react-native";
import Constants from "expo-constants";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
const Profile = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.safeAreaView}>
      <Text>Profile</Text>
      <Button title="deconnexion" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
