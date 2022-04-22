import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/components/home/HomeScreen';
import PaymentScreen from './src/components/payment/PaymentScreen';
import LoginScreen from './src/components/user/LoginScreen';
import ProfileScreen from './src/components/user/ProfileScreen';
import DetailsScreen from './src/components/details/DetailsScreen';
import CartScreen from './src/components/cart/CartScreen';
import SettingsScreen from './src/components/settings/SettingsScreen';
import OrderScreen from './src/components/orders/OrderScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/*
get total price of all items in the cart
profile screen grab email set to null
add products to contextAPI for global use
https://reactnavigation.org/docs/modal for delivery address
//record
data should be in a global store react native
https://stackoverflow.com/questions/44227235/global-state-in-react-native
https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
https://reactnavigation.org/docs/function-after-focusing-screen/
https://stackoverflow.com/questions/37601282/javascript-array-splice-vs-slice#:~:text=The%20splice()%20method%20returns%20the%20removed%20items%20in%20an,t%20change%20the%20original%20array.
https://jsonformatter.org/json-parser
https://react-native-async-storage.github.io/async-storage/docs/api
https://reactnavigation.org/docs/params/
*/
