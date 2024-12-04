import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
const Room = () => {
  return (
    <View style={styles.safeAreaView}>
      <Text>Room</Text>
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
export default Room;
