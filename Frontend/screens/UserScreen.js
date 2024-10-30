import { View, Text, StatusBar, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BackArrow from '../svgs/BackArrow';
import Transaction from './Transaction';
import DownArrow from '../svgs/DownArrow';
import UpArrow from '../svgs/UpArrow';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTransaction } from '../utils/transactionSlice';
import PageIcon from '../svgs/PageIcon';
import ThreeDots from '../svgs/ThreeDots';
import { API_URL } from "@env";

const h = Dimensions.get("window").height;


const UserScreen = ({route}) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {username, customerId, email} = route.params;
  const transactionList = useSelector((store) => store.transactionList.items);
  const [balance,setBalance] = useState(0);
  const [isPositive, setIsPositive] = useState(true);
  const [blank, setBlank] = useState(false);

  const url = API_URL+"/getTransaction";
  // console.log(url)

  useEffect(() => {
    let newBalance = 0;
    for (let i = 0; i < transactionList.length; i++) {
      const transaction = transactionList[i];
      if (transaction.isReceived) {
        newBalance += parseFloat(transaction.amount);
      } else {
        newBalance -= parseFloat(transaction.amount);
      }
    }
    
    setBalance(Math.abs(newBalance));
    setIsPositive(newBalance >= 0);

  }, [transactionList]); 

  useFocusEffect(
    React.useCallback(() => {
    const fetchData = async () => {
      try {
        const urlWithParams = `${API_URL+"/getTransaction"}?customerId=${encodeURIComponent(
          customerId
        )}`;
        const res = await fetch(urlWithParams, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          setBlank(true);
          //console.error(`Error: ${res.status} - ${res.statusText}`);
        }
        const ans = await res.json();
        const transactions = Array.isArray(ans.transactions) ? ans.transactions : [];
        //console.log(transactions)
        dispatch(setTransaction(transactions));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[]))

   const renderTransaction = ({ item }) => (
     <Transaction
       amount={item.amount}
       createdOn={item.createdOn}
       desc={item.desc}
       isReceived={item.isReceived}
       transactionId={item._id}
       billDate={item.date}
       reminderDate={item.reminderDate}
       username={username}
       customerId={customerId}
       email={email}
     />
   );


  return (
    <View style={styles.container} className="bg-bgColor h-[100%]">
      <View className="flex-row items-center bg-BlueColor p-2 justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-2" onPress={() => navigation.pop()}>
            <BackArrow />
          </TouchableOpacity>
          <Text className="rounded-full pl-4 py-2 bg-white w-12 h-12 text-2xl font-bold items-center  mr-3">
            {username.toUpperCase()[0]}
          </Text>
          <Text className="text-lg font-semibold text-white">{username}</Text>
        </View>
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="mr-4"
            onPress={() =>
              navigation.push("TabularView", { username, customerId })
            }
          >
            <PageIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DeleteUser", { username, customerId, email })
            }
          >
            <ThreeDots />
          </TouchableOpacity>
        </View>
      </View>

      { transactionList.length == 0 ? (
        <View style={styles.activityStyle}>
          {blank? <View className='justify-center items-center'><Text className='font-bold text-xl text-slate-400'>Start Transaction</Text></View> : <ActivityIndicator size="large" color="#00ff00" />}
        </View>
      ) : (
        <View className="pb-[190px]">
          <FlatList
            data={transactionList} // Data to be rendered
            renderItem={renderTransaction} // Render each item
            keyExtractor={(item, index) => index.toString()} // Ensure unique keys
          />
        </View>
      )}

      <View className="bg-gray-800 w-[100%] absolute" style={styles.bottomBannerStyle}>
        <View className=" flex-row justify-between p-2 items-center ">
          <Text className="text-lg text-slate-300">
            Balance {isPositive ? "Advance" : "Due"}
          </Text>
          <Text
            className={`${
              isPositive ? "text-GreenColor" : "text-red-600"
            } text-lg`}
          >
            ₹ {balance}
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "#cbd5e1",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View className="flex-row justify-between p-2 px-4">
          <View>
            <TouchableOpacity
              className="flex-row bg-white w-36 rounded-xl h-10 pl-4 items-center"
              onPress={() =>
                navigation.push("AddTransaction", {
                  username: username,
                  Received: true,
                  customerId,
                  email,
                })
              }
            >
              <DownArrow />
              <Text className="text-lg text-white text-GreenColor">
                {" "}
                Received
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              className="flex-row bg-white w-36 rounded-xl h-10 px-2 items-center justify-center"
              onPress={() =>
                navigation.push("AddTransaction", {
                  username: username,
                  Received: false,
                  customerId,
                  email,
                })
              }
            >
              <UpArrow />
              <Text className="text-lg text-white text-red-600"> Given</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default UserScreen

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  activityStyle: {
    flex: 1,
    marginTop: h * 0.25,
  },

  bottomBannerStyle:{
    bottom:h*0.035
  }
});