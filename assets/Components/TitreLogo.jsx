import { View, Image, Text, StyleSheet } from "react-native";
import MainLogo from "../imgs/logoAirBnb.png";

const TitreLogo = ({ title }) => {
  return (
    <View style={styles.block}>
      <Image source={MainLogo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
  },
  block: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
});
export default TitreLogo;
