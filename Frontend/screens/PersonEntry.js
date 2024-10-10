import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Rupee from '../svgs/Rupee';
import { useNavigation } from '@react-navigation/native';

const PersonEntry = ({name, isDue, amount, date, customerId, email, reminder}) => {

  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        className="flex-row justify-between p-2 my-2"
        onPress={() =>
          navigation.push("UserScreen", { username: name, customerId, email })
        }
      >
        <View className="flex-row">
          <Text className="rounded-full pl-4 py-2 bg-white w-12 h-12 text-2xl font-bold items-center mt-2">
            {name.toUpperCase()[0]}
          </Text>
          <View className="ml-2 pt-2">
            <Text className="mb-2 text-white font-bold">{name}</Text>
            <Text className="text-white text-[13px]">{reminder==='NA'? "Start transaction": `Last Due: ${reminder}`}</Text>
          </View>
        </View>

        <View className="items-end pt-2 ">
          <Text className={!isDue ? "text-GreenColor" : "text-red-600"}>
            ₹ {Math.abs(Number(amount))}
          </Text>
          <Text className="text-gray-500 text-[12px]">
            {isDue ? "Due" : "Advance"}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: "#3A81F1",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    </View>
  );
}

export default PersonEntry