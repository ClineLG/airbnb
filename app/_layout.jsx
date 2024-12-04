import { useState, useEffect } from "react";
import { Stack, router } from "expo-router";
import { AuthContext } from "../context/AuthContext";

const RootLayout = () => {
  const [userID, setuserID] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const login = (Token, ID) => {
    setUserToken(Token);
    setuserID(ID);
  };
  const logout = () => {
    setuserID(null);
    setUserToken(null);
  };

  useEffect(() => {
    if (userID && userToken) {
      router.replace("/(home)/home");
    } else {
      router.replace("/");
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ logout: logout, login: login }}>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthContext.Provider>
  );
};
export default RootLayout;
