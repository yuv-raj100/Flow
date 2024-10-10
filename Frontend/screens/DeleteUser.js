import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import BackArrow from '../svgs/BackArrow';
import { useNavigation } from '@react-navigation/native';
import ProfileImg from '../Images/profileImg.png'
import Dustbin from '../svgs/Dustbin';
import { API_URL } from "@env";

const DeleteUser = ({route}) => {

    const {username, customerId, email} = route.params;

  const navigation = useNavigation();
  // const email="raj@123";

  const url = API_URL+`/deleteUser/${email}/${customerId}`;


  const handleDelete = async ()=>{
    try {
      const response = await fetch(
        API_URL + `/deleteUser/${email}/${customerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        navigation.pop(2);
      } else {
        console.log("Cannot deleted");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container} className="h-[100%] bg-bgColor">
      <View className="flex-row items-center bg-BlueColor p-2 justify-between mb-20">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-2" onPress={() => navigation.pop()}>
            <BackArrow />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-white">Profile</Text>
        </View>
      </View>
      <View className="">
        <Image source={ProfileImg} className="h-[50%] w-[60%] mx-auto " />
        <Text className="text-3xl text-white mx-auto ">{username}</Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <View className="bg-gray-800 p-3  flex-row">
          <Dustbin />
          <Text className="text-slate-300 ml-5">Delete User</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default DeleteUser

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
});