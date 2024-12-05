import { TextInput, StyleSheet, useWindowDimensions } from "react-native";

const TextInputA = ({
  multiline,
  placeholder,
  name,
  userInfo,
  setErrorMessage,
  setUserInfo,
}) => {
  const styles = useStyle();
  return (
    <TextInput
      autoCapitalize="none"
      multiline={multiline}
      style={multiline ? styles.textArea : styles.textIn}
      placeholder={placeholder}
      onChangeText={(text) => {
        setErrorMessage("");
        const newObj = { ...userInfo };
        newObj[name] = text;
        setUserInfo(newObj);
      }}
      value={userInfo[name]}
    />
  );
};

const useStyle = () => {
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    textIn: {
      width: width / 1.5,

      borderBottomWidth: 1,
      borderColor: "red",

      padding: 5,
    },
    textArea: {
      borderWidth: 1,
      width: width / 1.5,
      borderColor: "red",
      paddingLeft: 5,
      paddingBottom: 50,
    },
  });
  return styles;
};
export default TextInputA;
