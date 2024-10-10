import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import LoginButton from "./LoginButton";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const IntroPage = () => {
  return (
    <View style={styles.container} className="bg-bgColor h-full">
      <Text
        className="text-white text-2xl text-center"
        style={{ marginTop: h * 0.3 }}
      >
        Raj Finance
      </Text>
      {/* <Text>Manage your cash flow</Text> */}
      <View className="" style={{ marginTop: h * 0.4 }}>
        <LoginButton isLogin={false} />
        <LoginButton isLogin={true} />
      </View>
    </View>
  );
};

export default IntroPage;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
});
