import { View, StyleSheet } from "react-native";

import SubmitSign from "../assets/Components/SubmitSign";
import TitreLogo from "../assets/Components/TitreLogo";
import TextInputA from "../assets/Components/TextInputA";
import PasswordTextInput from "../assets/Components/PasswordTextInput";
import Constants from "expo-constants";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handlePress = async () => {
    if (userInfo.email === "" || userInfo.password === "") {
      setErrorMessage("Please fill all fields");
    } else {
      try {
        setIsloading(true);
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          { email: userInfo.email, password: userInfo.password }
        );
        setIsloading(false);
        alert("connexion Réussie");
        // <Redirect href="/anotherPage" />;
      } catch (error) {
        setIsloading(false);

        if (error.response.data.error === "Unauthorized") {
          setErrorMessage("Wrong Password and/or Email");
        } else if (
          error.response.data.error === "This account doesn't exist !"
        ) {
          setErrorMessage("Address email unknown");
        } else {
          setErrorMessage("An error occured try again");
        }
      }
    }
  };

  return (
    <View style={styles.safeAreaView}>
      <KeyboardAwareScrollView
        style={styles.scrollStyle}
        contentContainerStyle={styles.container}
      >
        <TitreLogo title={"Sign in"} />

        <View style={styles.block}>
          <TextInputA
            name="email"
            placeholder="email"
            userInfo={userInfo}
            setErrorMessage={setErrorMessage}
            setUserInfo={setUserInfo}
            multiline={false}
          />

          <PasswordTextInput
            setErrorMessage={setErrorMessage}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            name={"password"}
            placeholder={"Password"}
          />
        </View>
        <SubmitSign
          isLoading={isLoading}
          handlePress={handlePress}
          errorMessage={errorMessage}
          route={"/signUp"}
          title="Sign In"
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    // gap: 100,
    paddingVertical: 50,
  },

  block: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
});
export default Login;
