import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import BackArrow from '../svgs/BackArrow'
import Dustbin from '../svgs/Dustbin'
import { useNavigation } from '@react-navigation/native'
import { API_URL } from "@env";

const TransactionDetails = ({route}) => {

  const navigation = useNavigation(); 
  
  const { isReceived, amount, transactionId, username, customerId, email  } = route.params
  // console.log(transactionId);

  const url = API_URL+`/deleteTransaction/${customerId}/${transactionId}/${email}`;
  const handleDelete = async () => {
    try {
      
      const response = await fetch(
        API_URL + `/deleteTransaction/${customerId}/${transactionId}/${email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const result = await response.json();

      if (response.ok) {
        navigation.pop();
      } else {
        console.log("Cannot deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <View style={styles.container} className="bg-bgColor h-[100%]">
      <View className="flex-row items-center bg-BlueColor p-2">
        <TouchableOpacity className="mr-2" onPress={() => navigation.pop()}>
          <BackArrow />
        </TouchableOpacity>
        <Text className="rounded-full pl-4 py-2 bg-white w-12 h-12 text-2xl font-bold items-center  mr-3">
          {username.toUpperCase()[0]}
        </Text>
        <Text className="text-lg font-semibold text-white">{username}</Text>
      </View>

      <View className="items-center my-5">
        <Text
          className={`${
            isReceived ? "text-GreenColor" : "text-red-600"
          } text-4xl font-bold`}
        >
          ₹ {amount}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <View className="bg-gray-800 p-3 justify- flex-row">
          <Dustbin />
          <Text className="text-slate-300 ml-5">Delete Credit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default TransactionDetails

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
});