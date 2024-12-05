import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RootLayout = () => {
  const [userID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const router = useRouter();

  const login = async (Token, ID, data) => {
    setUserToken(Token);
    setUserID(ID);

    await AsyncStorage.setItem("User", JSON.stringify(data));

    const info = await AsyncStorage.getItem("User");

    // console.log("Infos User AsyncStorage", info);
  };
  const logout = async () => {
    await AsyncStorage.removeItem("User");
    // console.log()

    setUserID(null);
    setUserToken(null);

    // console.log("Infos User AsyncStorage", info);
  };

  useEffect(() => {
    if (userID && userToken) {
      router.replace("/home");
    } else if (!userID || !userToken) {
      console.log("coucou");
      router.replace("/");
    }
  }, [userToken, userID]);

  return (
    <AuthContext.Provider
      value={{
        logout: logout,
        login: login,
        userID: userID,
        userToken: userToken,
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </AuthContext.Provider>
  );
};
export default RootLayout;
