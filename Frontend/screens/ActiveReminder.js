import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ReminderEntry from "./ReminderEntry";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const ActiveReminder = () => {

  const reminderList = useSelector((store) => store.reminderList.items);

  const dispatch = useDispatch();

  const renderTransaction = ({ item }) => (
    item.isActive && 
    <ReminderEntry
      amount={item.amount}
      createdOn={item.createdOn}
      desc={item.desc}
      isReceived={item.isReceived}
      transactionId={item._id}
      billDate={item.date}
      reminderDate={item.reminderDate}
      username={item.customerName}
      customerId={item.customerId}
      isActive={item.isActive}
    />
    
  );

  return (
    <View className='mt-3 mb-20'>
      <FlatList
        data={reminderList}
        renderItem={renderTransaction} 
        keyExtractor={(item, index) => index.toString()} 
      />
    </View>
  );
}

export default ActiveReminder

const styles = StyleSheet.create({})