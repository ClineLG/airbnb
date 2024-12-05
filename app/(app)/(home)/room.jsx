import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Link, useRouter, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import logo from "../../../assets/imgs/logoAirBnb.png";
import LottieView from "lottie-react-native";
import axios from "axios";

import { useEffect, useState, useRef } from "react";

const Room = () => {
  const styles = useStyle();
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState(null);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  // console.log(id);

  const animation = useRef(LottieView);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
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
        source={require("../../../assets/Animation - 1733416571603.json")}
      />
    </View>
  ) : (
    <View style={styles.safeAreaView}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <AntDesign
            style={styles.arrow}
            name="arrowleft"
            size={24}
            color="gray"
          />
        </Pressable>

        <Image source={logo} style={styles.logoHeader} resizeMode="contain" />
      </View>
      <ScrollView>
        <View style={styles.imagesPrice}>
          <FlatList
            horizontal={true}
            contentContainerStyle={styles.ContainerStyle}
            data={data.photos}
            keyExtractor={(item) => String(item.picture_id)}
            renderItem={({ item }) => {
              return (
                <Image source={{ uri: item.url }} style={styles.imagesItem} />
              );
            }} //console.log(item.url);
          />

          <Text style={styles.price}>{data.price} €</Text>
        </View>
        <View style={styles.description}>
          <View style={styles.bottomItem}>
            <View style={styles.TitleRate}>
              <Text numberOfLines={1} style={styles.itemTitle}>
                {data.title}
              </Text>
              <View style={styles.rate}>
                <FontAwesome
                  name="star"
                  size={24}
                  color={data.ratingValue > 1 ? "#FFB200" : "#BBBBBB"}
                />
                <FontAwesome
                  name="star"
                  size={24}
                  color={data.ratingValue > 2 ? "#FFB200" : "#BBBBBB"}
                />
                <FontAwesome
                  name="star"
                  size={24}
                  color={data.ratingValue > 3 ? "#FFB200" : "#BBBBBB"}
                />
                <FontAwesome
                  name="star"
                  size={24}
                  color={data.ratingValue > 4 ? "#FFB200" : "#BBBBBB"}
                />
                <FontAwesome
                  name="star"
                  size={24}
                  color={data.ratingValue > 5 ? "#FFB200" : "#BBBBBB"}
                />
                <Text style={styles.reviews}>{data.reviews} reviews</Text>
              </View>
            </View>
            <Image
              source={{ uri: data.user.account.photo.url }}
              style={styles.userImage}
              resizeMode="cover"
            />
          </View>
          <Text numberOfLines={!showMore && 3} style={styles.textDescription}>
            {data.description}
          </Text>
          <Pressable
            onPress={() => {
              setShowMore(!showMore);
            }}
          >
            <View style={showMore ? styles.hidden : styles.row}>
              <Text style={styles.showMore}>Show more</Text>
              <AntDesign name="caretdown" size={17} color="#717171" />
            </View>
            <View style={!showMore ? styles.hidden : styles.row}>
              <Text style={styles.showMore}>Show less</Text>
              <AntDesign name="caretup" size={17} color="#717171" />
            </View>
          </Pressable>
          <View style={styles.map}></View>
        </View>
      </ScrollView>
    </View>
  );
};
const useStyle = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    safeAreaView: {
      backgroundColor: "white",
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    header: {
      width: "100%",
      borderBottomColor: "#F0F0F0",
      borderBottomWidth: 1,
      paddingVertical: 20,
      paddingHorizontal: 15,
      alignItems: "center",
      // justifyContent: "center",
      flexDirection: "row",
      // gap: "38%",
      position: "relative",
    },
    logoHeader: {
      // borderWidth: 1,
      // borderColor: "red",
      position: "absolute",
      right: "50%",
      width: 35,
      height: 35,
    },
    arrow: {
      justifyContentSelf: "flex-start",
    },
    ContainerStyle: {},
    imagesPrice: {
      position: "relative",
    },

    imagesItem: { height: height / 3, width: width },
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
    description: {
      paddingHorizontal: 15,
    },
    textDescription: {
      fontSize: 15,
      paddingBottom: 10,
    },
    map: {
      marginTop: 20,
      height: 200,
      backgroundColor: "green",
    },
    hidden: {
      display: "none",
    },
    showMore: {
      color: "#717171",
    },
    row: {
      flexDirection: "row",
      gap: 10,
      alignItems: "flex-end",
    },
  });
  return styles;
};
export default Room;
