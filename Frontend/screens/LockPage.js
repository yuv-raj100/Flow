import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState, useRef } from "react";
import { VirtualKeyboard } from "react-native-screen-keyboard";
import { OtpInput } from "react-native-otp-entry";
import { TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";



const LockPage = () => {
  // State to store the typed text
  const [typedText, setTypedText] = useState("");
  // const tempPin = "2424";
  const [userPIN, setUserPIN] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const getPIN = async () => {
    try {
      const userPIN = await AsyncStorage.getItem("userPIN");
      if (userPIN !== null) {
        setUserPIN(userPIN);
      } else {
        setError("Set a PIN first !");
      }
    } catch (error) {
      console.error("Error retrieving userPIN", error);
      return null;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Reset typedText when screen is focused
      setTypedText("");
      setError("");
    }, [])
  );


  const handleClick = async ()=>{
    const storedPIN = await AsyncStorage.getItem("userPIN");
    if(typedText.length<4){
        setError("Enter full PIN")
        return;
    }
    else if(typedText !== storedPIN){
        setError("Wrong PIN!")
        return;
    }
     navigation.reset({
       index: 0, // Index of the active route
       routes: [{ name: "HomePage" }], // Reset the stack to HomePage
     });
  }

//   const handleKeyDown = (key) => {
//     console.log("Key pressed: ", key);
//   };

//   const handleChange = (fullString) => {
//     console.log("Current text: ", fullString);
//     setTypedText(fullString); 
//   };

  return (
    <View style={styles.container} className="bg-bgColor h-[100%]">
      <KeyboardAvoidingView
        behavior="padding"
      >
        <View className="items-center mt-20">
          <Text
            className="text-white text-2xl font-bold "
            style={{ letterSpacing: 4, fontFamily: "Roboto" }}
          >
            RAJ
          </Text>
          <Text className="text-white text-2xl font-bold">FINANCE</Text>
        </View>
        {/* 
      <Text className="text-white text-2xl font-bold">{typedText}</Text> */}

        <View className="mt-20 px-16">
          <OtpInput
            numberOfDigits={4}
            onTextChange={(typedText) => setTypedText(typedText)}
            theme={{
              containerStyle: styles.container,
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
        </View>

        <View className="items-center mt-2">
          {error.length > 0 && (
            <Text className="text-white text-md text-red-400">*{error}</Text>
          )}
        </View>

        <View className="items-center mt-5">
          <TouchableOpacity onPress={() => navigation.push("SetPIN")}>
            <Text className="text-white text-md font-semibold">
              Set new PIN
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <View className="absolute bottom-12 w-[100%]">
        <TouchableOpacity
          className="my-2 mx-8 border-slate-400 border border-b-2 rounded-md  px-2 py-2 bg-BlueColor"
          onPress={() => handleClick()}
        >
          <Text className="text-center text-white text-lg font-semibold">
            Confirm
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View className="absolute bottom-7 right-0 border-2  w-[100%]">
        <VirtualKeyboard
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onPressFunction="onPress" // You can customize this based on your need
          vibration={true}
        />
      </View> */}
    </View>
  );
};

export default LockPage;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  pinCodeText:{
    color:'white'
  }
});
