import { View, Text, Switch } from 'react-native'
import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import { toggleReminder } from '../utils/reminderSlice';
import { API_URL } from "@env";

const ReminderEntry = ({isReceived, amount, desc, createdOn,reminderDate, billDate, transactionId, username, customerId, isActive}) => {

  const url = API_URL+"/toggleReminder";

  const fetchData = async () => {
    try {
      const urlWithParams = `${
        API_URL + "/toggleReminder"
      }?tId=${encodeURIComponent(transactionId)}`;
      const res = await fetch(urlWithParams, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const ans = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const [active, setActive] = useState(!isActive);
  const toggleSwitch = async () => {
    dispatch(toggleReminder(transactionId));
    fetchData();
    setActive((previousState) => !previousState);
  }

  const dispatch = useDispatch();

  return (
    <View>
      <View className="bg-gray-800 m-1 p-2 mt-2 rounded-lg">
        <View className="flex-row justify-between items-center">
          <Text className="text-BlueColor text-xl font-semibold">
            {username}
          </Text>
          <Text className="text-white">{reminderDate}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-lg text-white">
              You {isReceived ? "Pay" : "Get"} :{" "}
            </Text>
            <Text
              className={`${
                isReceived ? "text-GreenColor" : "text-red-600"
              } text-lg mt-1`}
            >
              ₹ {amount}
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{ false: "#767577", true: "#3A81F1" }}
              thumbColor={active ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={active}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default ReminderEntry