import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Platform,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";

const PasswordTextInput = ({
  setErrorMessage,
  setUserInfo,
  name,
  userInfo,
  placeholder,
}) => {
  const styles = useStyle();
  const [showPassword, setShowPassWord] = useState(false);
  return (
    <View style={styles.password}>
      <TextInput
        style={styles.passwordInput}
        secureTextEntry={showPassword ? false : true}
        placeholder={placeholder}
        onChangeText={(text) => {
          setErrorMessage("");

          const newObj = { ...userInfo };
          newObj[name] = text;
          setUserInfo(newObj);
        }}
        value={userInfo[name]}
      />
      <Pressable
        onPress={() => {
          setShowPassWord(!showPassword);
        }}
      >
        <Entypo name="eye" size={20} color="red" />
      </Pressable>
    </View>
  );
};

const useStyle = () => {
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    password: {
      flexDirection: "row",
      borderColor: "red",
      borderBottomWidth: 1,
      width: width / 1.5,
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: Platform.OS === "android" ? 0 : 2,
    },
    passwordInput: {
      height: "100%",

      flex: 1,
      marginBottom: Platform.OS === "android" ? -5 : 0,
    },
  });
  return styles;
};

export default PasswordTextInput;
