import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
// import { AuthContext } from "../../../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import logo from "../../../assets/imgs/logoAirBnb.png";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LottieView from "lottie-react-native";

import axios from "axios";

const Home = () => {
  const animation = useRef(LottieView);
  const router = useRouter();
  // const { userToken } = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState(null);
  // if (!userToken) {
  //   return <Redirect href="/" />;
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.safeAreaView}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logoHeader} resizeMode="contain" />
      </View>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#eee",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../../assets/Animation - 1733416571603.json")}
      />
    </View>
  ) : (
    <View style={styles.safeAreaView}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logoHeader} resizeMode="contain" />
      </View>
      <FlatList
        contentContainerStyle={styles.ContainerStyle}
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                router.push(`/room?id=${item._id}`);
              }}
              style={styles.item}
            >
              {console.log(item)}
              <View style={styles.imagesPrice}>
                <Image
                  source={{ uri: item.photos[0].url }}
                  style={styles.imagesItem}
                />

                <Text style={styles.price}>{item.price} €</Text>
              </View>

              <View style={styles.bottomItem}>
                <View style={styles.TitleRate}>
                  <Text numberOfLines={1} style={styles.itemTitle}>
                    {item.title}
                  </Text>
                  <View style={styles.rate}>
                    <FontAwesome
                      name="star"
                      size={24}
                      color={item.ratingValue > 1 ? "#FFB200" : "#BBBBBB"}
                    />
                    <FontAwesome
                      name="star"
                      size={24}
                      color={item.ratingValue > 2 ? "#FFB200" : "#BBBBBB"}
                    />
                    <FontAwesome
                      name="star"
                      size={24}
                      color={item.ratingValue > 3 ? "#FFB200" : "#BBBBBB"}
                    />
                    <FontAwesome
                      name="star"
                      size={24}
                      color={item.ratingValue > 4 ? "#FFB200" : "#BBBBBB"}
                    />
                    <FontAwesome
                      name="star"
                      size={24}
                      color={item.ratingValue > 5 ? "#FFB200" : "#BBBBBB"}
                    />
                    <Text style={styles.reviews}>{item.reviews} reviews</Text>
                  </View>
                </View>
                <Image
                  source={{ uri: item.user.account.photo.url }}
                  style={styles.userImage}
                  resizeMode="cover"
                />
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
    flex: 1,
    // borderColor: "red",
    // borderWidth: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    width: "100%",
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
    padding: 10,
    alignItems: "center",
  },
  logoHeader: {
    width: 35,
    height: 35,
  },
  ContainerStyle: {
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  item: {
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
  },
  imagesPrice: {
    height: 200,
    width: "100%",
    position: "relative",
  },
  imagesItem: { height: "100%", width: "100%" },
  price: {
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    bottom: 10,
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemTitle: {
    fontSize: 20,
    lineHeight: 30,
  },

  rate: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  reviews: {
    color: "#BBBBBB",
  },
  TitleRate: {
    gap: 15,
    width: "70%",
  },
  userImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  bottomItem: {
    paddingBottom: 20,
    paddingTop: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});
export default Home;
