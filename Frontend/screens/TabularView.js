import { View, Text, StatusBar, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import BackArrow from '../svgs/BackArrow';
import { useNavigation } from '@react-navigation/native';
import { Table, Row, Rows } from "react-native-table-component";
import { useSelector } from "react-redux";


const TabularView = ({route}) => {

  
    const tableHead= ["Amount", "Description", "Date", "Reminder Date"];
    const [tableData,setTableData]= useState([])


  const transactionList = useSelector((store) => store.transactionList.items);
  
    useEffect(() => {
      const formattedData = transactionList.map((transaction) => [
        "₹ " + transaction.amount,
        transaction.desc,
        transaction.date,
        transaction.reminderDate,
        transaction.isReceived,
      ]);
      setTableData(formattedData);
    }, [transactionList]);

  const navigation = useNavigation();
  const { username, customerId } = route.params;
  const [data, setData] = useState(tableData);
  const widthArr = [65, 120, 90, 90 ];

  return (
    <View style={styles.container} className="h-[100%] bg-bgColor">
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
      </View>
      <ScrollView className="h-80% mb-8">
        <View className="mt-8 mx-2">
          <Table borderStyle={{ borderWidth: 1, borderColor: "#125B9A" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.head}
              textStyle={styles.headText}
            />
            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData.slice(0, 4)} // Displaying first 4 fields: amount, description, date, reminderDate
                style={[
                  rowData[4] ? styles.receivedRow : styles.sentRow, // Conditionally apply background color based on transaction type
                ]}
                widthArr={widthArr}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </View>
      </ScrollView>
    </View>
  );
}

export default TabularView

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  head: { height: 40, backgroundColor: "#DF826C" },
  headText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
//   row: {
//     height: 40,
//   },
  receivedRow: {
    backgroundColor: "#47cf73", // Light green for received transactions
  },
  sentRow: {
    backgroundColor: "#dc2626", // Light red for sent transactions
  },
  text: { margin: 3, fontSize: 13, fontWeight: "bold", textAlign: "center" },
});