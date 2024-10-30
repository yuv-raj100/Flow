import { View, Text, TouchableOpacity, StatusBar, StyleSheet, TextInput, Platform, Pressable, Switch} from "react-native";
import React, { useState } from "react";
import BackArrow from "../svgs/BackArrow";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { addTransaction } from "../utils/transactionSlice";
import { API_URL } from "@env";



const AddTransaction = ({route}) => {

  const dispatch = useDispatch();

  const {username, Received, customerId, email} = route.params;
  const navigation = useNavigation();
  const [amount,setAmount] = useState('');
  const [desc,setDesc] = useState("");
  const [remind,setRemind] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [error,setError] = useState("");

  const [date, setDate] = useState(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  })

  const [reminderDate, setReminderDate] = useState(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  })

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

   const handleConfirm = (selectedDate) => {
    if(!remind){
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      setDate(formattedDate);  
      hideDatePicker();
    }
    else{
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      setReminderDate(formattedDate); 
      hideDatePicker();
      setRemind(false);
    }
  }; 

   const handleClick = async () => {
    if(!amount){
      setError("*Please enter an amount");
      return;
    }
    
    const transaction = {
      customerId,
      createdOn: new Date().toISOString(),
      amount: amount,
      date: date,
      desc: desc,
      customerName:username,
      reminderDate:reminderDate,
      isReceived:Received,
      email,
      remindMe,
    }

    dispatch(
      addTransaction(transaction)
    );
    await fetchData(transaction);
   };

   const url = API_URL+"/addTransaction";

   const fetchData = async (data) => {
     try {
       const res = await fetch(API_URL + "/addTransaction", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       });
       if (!res.ok) {
         console.error(`Error: ${res.status} - ${res.statusText}`);
         return;
       }
       const ans = await res.json();
       if (res.ok) {
         navigation.pop();
       }
     } catch (err) {
       console.log(err);
     }
   };

  const [remindMe, setRemindMe] = useState(false);
  const toggleSwitch = () => setRemindMe((previousState) => !previousState);

  return (
    <View style={styles.container} className="bg-bgColor h-[100%] ">
      <View className="flex-row items-center bg-BlueColor p-2">
        <TouchableOpacity className="mr-2" onPress={() => navigation.pop()}>
          <BackArrow />
        </TouchableOpacity>
        <Text className="rounded-full pl-4 py-2 bg-white w-12 h-12 text-2xl font-bold items-center  mr-3">
          {username.toUpperCase()[0]}
        </Text>
        <Text className="text-lg font-semibold text-white">{username}</Text>
      </View>

      <View className="flex-row items-center justify-center">
        <Text
          className={`${Received ? "text-GreenColor" : "text-red-600"} text-xl`}
        >
          ₹
        </Text>
        <TextInput
          editable
          value={amount}
          placeholder="0"
          onChangeText={(amount) => setAmount(amount)}
          className="border-b-2 border-b-BlueColor h-20 text-white text-2xl items-center  px-4"
          keyboardType="numeric"
          placeholderTextColor="#f1f5f9"
        ></TextInput>
      </View>

      {error.length > 0 && (
        <View className="justify-center items-center mt-2">
          <Text className="text-yellow-600">{error}</Text>
        </View>
      )}

      <View className="border-2 border-slate-200 rounded-xl m-2 mt-8 items-center  p-2">
        <View style={styles.labelContainer}>
          <Text className="text-slate-400">Entry Date</Text>
        </View>
        <View>
          <Pressable onPress={showDatePicker}>
            <TextInput
              placeholder={date}
              value={date}
              editable={false}
              className="h-10 text-white text-lg"
              placeholderTextColor="#f1f5f9"
            />
          </Pressable>
        </View>
      </View>
      <View className="border-2 border-slate-200 rounded-xl m-2 mt-8 items-center  p-2">
        <View style={styles.labelContainer}>
          <Text className="text-slate-400">Reminder Date</Text>
        </View>
        <View>
          <Pressable
            onPress={() => {
              showDatePicker(), setRemind(true);
            }}
          >
            <TextInput
              placeholder={reminderDate}
              value={reminderDate}
              editable={false}
              className="h-10 text-white text-lg"
              placeholderTextColor="#f1f5f9"
            />
          </Pressable>
        </View>
      </View>

      <View className="border-2 border-slate-200 rounded-xl m-2 mt-8  p-2">
        <View style={styles.labelContainer}>
          <Text className="text-slate-400">Description</Text>
        </View>
        <View>
          <TextInput
            placeholder="Add Note (Optional)"
            value={desc}
            editable
            onChangeText={(desc) => setDesc(desc)}
            className="h-10 text-white w-full "
            placeholderTextColor="#f1f5f9"
          />
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <View className="flex-row items-center m-2 p-1">
        <Text className="mr-auto text-slate-400 text-lg">Remind Me</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#3A81F1" }}
          thumbColor={remindMe ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={remindMe}
        />
      </View>

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
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  labelContainer: {
    backgroundColor: "#212121", // Same color as background
    alignSelf: "flex-start", // Have View be same width as Text inside
    paddingHorizontal: 3, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 1, // Needed for android
    shadowColor: "#212121", // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "absolute", // Needed to be able to precisely overlap label with border
    top: -12, // Vertical position of label. Eyeball it to see where label intersects border.
  },
});