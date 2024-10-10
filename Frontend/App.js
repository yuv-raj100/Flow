import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import IntroPage from './screens/IntroPage';
import HomePage from './screens/HomePage';
import AddUser from './screens/AddUser';
import UserScreen from './screens/UserScreen';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import AddTransaction from './screens/AddTransaction';
import LoginPage from './screens/LoginPage';
import TransactionDetails from './screens/TransactionDetails';
import TabularView from './screens/TabularView';
import DeleteUser from './screens/DeleteUser';
import LockPage from './screens/LockPage';
import SetPinPage from './screens/SetPinPage';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={appStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LockPage">
          <Stack.Screen
            name="IntroPage"
            component={IntroPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddUser"
            component={AddUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserScreen"
            component={UserScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddTransaction"
            component={AddTransaction}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TransactionDetails"
            component={TransactionDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabularView"
            component={TabularView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DeleteUser"
            component={DeleteUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LockPage"
            component={LockPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SetPIN"
            component={SetPinPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
