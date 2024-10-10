import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import UpArrow from '../svgs/UpArrow';
import DownArrow from '../svgs/DownArrow';
import { useNavigation } from '@react-navigation/native';

const Transaction = ({isReceived, amount, desc, createdOn,reminderDate, billDate, transactionId, username, customerId,email}) => {

  const date = new Date(createdOn);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const navigation = useNavigation();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; 
 
  const formattedTime = `${hours}:${minutes} ${ampm}`;
    
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('TransactionDetails', {isReceived, amount, desc, transactionId, username, customerId, email})}>
      <View className={`m-2 items-${isReceived ? "start" : "end"}`}>
        <View className="border border-yellow-50 w-[200px] rounded-xl p-2">
          <View className=" flex-row items-center mb-2 justify-between">
            <View className="flex-row items-center">
              {!isReceived ? <UpArrow /> : <DownArrow />}
              <Text
                className={`${
                  isReceived ? "text-GreenColor" : "text-red-600"
                } text-xl`}
              >
                {amount}
              </Text>
            </View>

            <Text className="text-slate-300 mr-2">{formattedTime}</Text>
          </View>
          {desc && <Text className="text-slate-300 pl-1">{desc}</Text>}
        </View>
        <Text className="text-slate-300 ml-[120px]">₹ {amount} Due</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Transaction