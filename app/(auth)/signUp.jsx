import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useState } from "react";
import Constants from "expo-constants";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SubmitSign from "../../assets/Components/SubmitSign";
import TitreLogo from "../../assets/Components/TitreLogo";
import TextInputA from "../../assets/Components/TextInputA";
import PasswordTextInput from "../../assets/Components/PasswordTextInput";

const SignUp = () => {
  const { login } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const handlePress = async () => {
    const { email, password, username, description, confirmPassword } =
      userInfo;

    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      username === "" ||
      description === ""
    ) {
      setErrorMessage("Please fill all fields");
    } else {
      if (confirmPassword !== password) {
        setErrorMessage("Vos mots de passe ne sont pas identique");
      } else {
        try {
          setIsloading(true);
          const response = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              email: email,
              password: password,
              username: username,
              description: description,
            }
          );
          setIsloading(false);

          console.log(response.data);
          login(response.data.token, response.data.id, response.data);
          // alert("connexion Réussie");
        } catch (error) {
          setIsloading(false);
          console.log(error.response.data.error);
          if (
            error.response.data.error === "This email already has an account."
          ) {
            setErrorMessage("This email is already registered");
          } else if (
            error.response.data.error ===
            "This username already has an account."
          ) {
            setErrorMessage(
              "This username is already registered, please chose another one"
            );
          } else {
            setErrorMessage("An error occured try again");
          }
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
        <TitreLogo title={"Sign up"} />

        <View style={styles.block}>
          <TextInputA
            placeholder="Email"
            name={"email"}
            userInfo={userInfo}
            setErrorMessage={setErrorMessage}
            setUserInfo={setUserInfo}
            multiline={false}
          />
          <TextInputA
            placeholder="Username"
            name={"username"}
            userInfo={userInfo}
            setErrorMessage={setErrorMessage}
            setUserInfo={setUserInfo}
            multiline={false}
          />
          <TextInputA
            placeholder="Describe yourself in a few words..."
            name={"description"}
            multiline={true}
            userInfo={userInfo}
            setErrorMessage={setErrorMessage}
            setUserInfo={setUserInfo}
          />
          <PasswordTextInput
            setErrorMessage={setErrorMessage}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            name={"password"}
            placeholder={"Password"}
          />
          <PasswordTextInput
            setErrorMessage={setErrorMessage}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            placeholder={"Confirm password"}
            name={"confirmPassword"}
          />
        </View>

        <SubmitSign
          isLoading={isLoading}
          handlePress={handlePress}
          errorMessage={errorMessage}
          route={"/"}
          title="Sign Up"
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
    // marginTop: Constants.statusBarHeight,
  },
  container: {
    gap: 50,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 50,
  },
  block: {
    flex: 1,
    alignItems: "center",
    gap: 30,
  },
});
export default SignUp;
